// generate-songs.ts
// Takes prompts from data/prompts.json, combines them with the Strudel system
// prompt, and sends them to AI providers (Claude, ChatGPT, Gemini) to generate
// Strudel.cc music code. Outputs .txt files to data/{provider}/.
//
// Usage: bun scripts/generate-songs.ts --provider claude|chatgpt|gemini|all [--concurrency 3] [--start 0] [--dry-run]

import { resolve, dirname } from "path"
import { existsSync, mkdirSync } from "fs"

const PROJECT_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..")
const PROMPTS_PATH = resolve(PROJECT_ROOT, "data/prompts.json")
const SYSTEM_PROMPT_PATH = resolve(PROJECT_ROOT, "data/strudel-system-prompt.txt")
const PUBLIC_DIR = resolve(PROJECT_ROOT, "data")
const DEFAULT_CONCURRENCY = 3

type Prompt = { slug: string; text: string; category: string }

// ── CLI ──────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2)
  const providerIdx = args.indexOf("--provider")
  const provider = providerIdx !== -1 ? args[providerIdx + 1] : "all"

  const startIdx = args.indexOf("--start")
  const start = startIdx !== -1 ? parseInt(args[startIdx + 1], 10) : 0

  const ci = args.indexOf("--concurrency")
  const concurrency = ci !== -1 ? parseInt(args[ci + 1], 10) : DEFAULT_CONCURRENCY

  const maxIdx = args.indexOf("--max")
  const max = maxIdx !== -1 ? parseInt(args[maxIdx + 1], 10) : Infinity

  const dryRun = args.includes("--dry-run")

  if (!["claude", "chatgpt", "gemini", "all"].includes(provider)) {
    console.error("--provider must be claude, chatgpt, gemini, or all")
    process.exit(1)
  }

  return { provider, start, concurrency, dryRun, max }
}

// ── Generate with a provider ────────────────────────────────────────────

async function generateWithProvider(
  provider: string,
  fullPrompt: string,
  outputPath: string,
): Promise<void> {
  if (provider === "claude") {
    const result =
      await Bun.$`claude -p ${fullPrompt} --output-format text`.text()
    const cleaned = cleanOutput(result)
    await Bun.write(outputPath, cleaned)
  } else if (provider === "chatgpt") {
    // Codex is an agent — tell it to write the file directly
    const agentPrompt = `${fullPrompt}\n\nWrite the Strudel.cc code to this file: ${outputPath}\nDo NOT write anything else. Just the Strudel code in that file.`
    await Bun.$`codex exec --full-auto ${agentPrompt}`.quiet()

    // Verify the file was created and clean it
    if (existsSync(outputPath)) {
      const content = await Bun.file(outputPath).text()
      await Bun.write(outputPath, cleanOutput(content))
    } else {
      throw new Error("Codex did not create the output file")
    }
  } else if (provider === "gemini") {
    const result =
      await Bun.$`gemini -p ${fullPrompt}`.text()
    const cleaned = cleanOutput(result)
    await Bun.write(outputPath, cleaned)
  } else {
    throw new Error(`Unknown provider: ${provider}`)
  }
}

// ── Clean AI output ─────────────────────────────────────────────────────

function cleanOutput(output: string): string {
  let cleaned = output.trim()
  // Remove markdown code fences if the AI wraps them
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\w*\n?/, "").replace(/\n?```$/, "")
  }
  return cleaned.trim()
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const { provider, start, concurrency, dryRun, max } = parseArgs()

  const prompts: Prompt[] = JSON.parse(
    await Bun.file(PROMPTS_PATH).text(),
  )
  const systemPrompt = await Bun.file(SYSTEM_PROMPT_PATH).text()

  const providers = provider === "all" ? ["claude", "chatgpt", "gemini"] : [provider]

  // Build list of all tasks to run
  type Task = { prov: string; prompt: Prompt; outputPath: string; fullPrompt: string }
  const tasks: Task[] = []

  for (const prov of providers) {
    const provDir = resolve(PUBLIC_DIR, prov)
    if (!existsSync(provDir)) {
      mkdirSync(provDir, { recursive: true })
    }

    const end = Math.min(prompts.length, start + max)
    for (let i = start; i < end; i++) {
      const prompt = prompts[i]
      const outputPath = resolve(provDir, `${prompt.slug}.txt`)

      if (existsSync(outputPath)) {
        console.log(`  [skip] ${prov}/${prompt.slug}.txt (exists)`)
        continue
      }

      tasks.push({
        prov,
        prompt,
        outputPath,
        fullPrompt: systemPrompt.replace("{PROMPT}", prompt.text),
      })
    }
  }

  if (tasks.length === 0) {
    console.log("All songs already generated. Nothing to do.")
    return
  }

  console.log(`\nGenerating ${tasks.length} songs (concurrency: ${concurrency})`)
  if (dryRun) {
    console.log("(dry run — no actual generation)")
    for (const task of tasks) {
      console.log(`  ${task.prov}/${task.prompt.slug}`)
    }
    return
  }

  let completed = 0
  let failed = 0

  for (let i = 0; i < tasks.length; i += concurrency) {
    const batch = tasks.slice(i, i + concurrency)

    const results = await Promise.allSettled(
      batch.map(async (task) => {
        const label = `${task.prov}/${task.prompt.slug}`
        console.log(`  [start] ${label}`)
        const startTime = Date.now()

        await generateWithProvider(task.prov, task.fullPrompt, task.outputPath)

        const fileSize = (await Bun.file(task.outputPath).text()).length
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
        return { label, elapsed, fileSize }
      }),
    )

    for (const result of results) {
      completed++
      if (result.status === "fulfilled") {
        const { label, elapsed, fileSize } = result.value
        console.log(`  [done]  ${label} (${elapsed}s, ${fileSize} chars) [${completed}/${tasks.length}]`)
      } else {
        failed++
        console.error(`  [FAIL]  ${result.reason} [${completed}/${tasks.length}]`)
      }
    }
  }

  console.log(`\nFinished. ${completed - failed} succeeded, ${failed} failed.`)
}

main()

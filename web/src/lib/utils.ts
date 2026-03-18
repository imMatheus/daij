import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROVIDER_IMAGES: Record<string, string> = {
  claude:
    // 'https://cdn.midjourney.com/d5ae7c42-b935-4879-923e-93b3fce3ba47/0_0.png',
    // 'https://cdn.midjourney.com/d18c88ad-fe45-4450-b4bc-73c1d5688fc7/0_0.png',
    // 'https://cdn.midjourney.com/324f29e0-db9a-4fb2-bd7d-f7ec38f38a92/0_1.png',
    'https://cdn.midjourney.com/3a45bb45-929b-47d0-baa1-d043df6912cf/0_0.png',
  chatgpt:
    // 'https://cdn.midjourney.com/127f8606-486e-4b8e-a6e6-80c391677e73/0_0.png',
    // 'https://cdn.midjourney.com/0384d268-9702-4b56-b3c3-f12a0b5f4b50/0_0.png',
    // 'https://cdn.midjourney.com/f6ace72c-1745-42cd-9cc8-b45401a0a893/0_1.png',
    // 'https://cdn.midjourney.com/95143aef-264c-49a7-8cdd-33734fa926dd/0_0.png',
    'https://cdn.midjourney.com/e3c988a8-78d0-46d2-9638-ec6d66c660b3/0_0.png',
  gemini:
    // 'https://cdn.midjourney.com/5388af7c-a870-449b-b96e-dbbbc696595f/0_0.png',
    // 'https://cdn.midjourney.com/8755c041-3a75-457b-9a5d-9a2101a3c289/0_0.png'
    // 'https://cdn.midjourney.com/1904adb1-18bb-4008-a0da-aeb48e6fe84a/0_0.png',
    'https://cdn.midjourney.com/be7d14e2-325a-4d31-96bc-a33550273e36/0_0.png',
}

export function getProviderImage(provider: string): string {
  return PROVIDER_IMAGES[provider] ?? PROVIDER_IMAGES.claude
}

export const MYSTERY_IMAGE =
  'https://cdn.midjourney.com/08c3727e-bd48-48bb-9328-cd7b5db6921a/0_0.png'

export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function getSongPath(song: { audioUrl: string }): string {
  return song.audioUrl.replace(/\.wav$/, '')
}

const CDN_URL = 'https://pub-5b5da887d0d44388ac15fa702af1c2c6.r2.dev'

export function getAudioUrl(audioUrl: string): string {
  return `${CDN_URL}${audioUrl}`
}

export function providerLabel(provider: string) {
  switch (provider) {
    case 'claude':
      return 'Claude'
    case 'chatgpt':
      return 'ChatGPT'
    case 'gemini':
      return 'Gemini'
    default:
      return provider
  }
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROVIDER_IMAGES: Record<string, string> = {
  claude:
    // 'https://cdn.midjourney.com/d5ae7c42-b935-4879-923e-93b3fce3ba47/0_0.png',
    // 'https://cdn.midjourney.com/d18c88ad-fe45-4450-b4bc-73c1d5688fc7/0_0.png',
    'https://cdn.midjourney.com/324f29e0-db9a-4fb2-bd7d-f7ec38f38a92/0_1.png',
  chatgpt:
    // 'https://cdn.midjourney.com/127f8606-486e-4b8e-a6e6-80c391677e73/0_0.png',
    // 'https://cdn.midjourney.com/0384d268-9702-4b56-b3c3-f12a0b5f4b50/0_0.png',
    'https://cdn.midjourney.com/f6ace72c-1745-42cd-9cc8-b45401a0a893/0_1.png',
  gemini:
    // 'https://cdn.midjourney.com/5388af7c-a870-449b-b96e-dbbbc696595f/0_0.png',
    // 'https://cdn.midjourney.com/8755c041-3a75-457b-9a5d-9a2101a3c289/0_0.png'
    'https://cdn.midjourney.com/1904adb1-18bb-4008-a0da-aeb48e6fe84a/0_0.png'
}

export function getProviderImage(provider: string): string {
  return PROVIDER_IMAGES[provider] ?? PROVIDER_IMAGES.claude
}

export const MYSTERY_IMAGE =
  'https://cdn.midjourney.com/c3ba9b43-aa12-45d1-9233-9ac61c824036/0_0.png'

export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function getSongPath(song: { audioUrl: string }): string {
  return song.audioUrl.replace(/\.wav$/, '')
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROVIDER_IMAGES: Record<string, string> = {
  claude:
    'https://cdn.midjourney.com/d5ae7c42-b935-4879-923e-93b3fce3ba47/0_0.png',
  chatgpt:
    'https://cdn.midjourney.com/127f8606-486e-4b8e-a6e6-80c391677e73/0_0.png',
  gemini:
    'https://cdn.midjourney.com/5388af7c-a870-449b-b96e-dbbbc696595f/0_0.png',
}

export function getProviderImage(provider: string): string {
  return PROVIDER_IMAGES[provider] ?? PROVIDER_IMAGES.claude
}

export const MYSTERY_IMAGE =
  'https://cdn.midjourney.com/c3ba9b43-aa12-45d1-9233-9ac61c824036/0_0.png'

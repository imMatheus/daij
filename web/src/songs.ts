export type Song = {
  id: number
  name: string
  provider: 'claude' | 'chatgpt' | 'gemini'
  audioUrl: string
  duration: number
  eloRating: number
  totalVotes: number
  wins: number
  prompt: string | null
  listens: number
}

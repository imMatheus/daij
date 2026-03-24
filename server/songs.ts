export type Song = {
  name: string
  theme: string
  provider: 'claude' | 'chatgpt' | 'gemini'
  audioUrl: string
  duration: number // in seconds
}

export const songs: Song[] = [
  {
    name: 'Late Night Drive',
    theme: 'night drive',
    duration: 30,
    provider: 'claude',

    audioUrl: '/claude/late-night-drive.mp3',
  },
  {
    name: 'Midnight Coffee',
    theme: 'quiet rain',
    duration: 130,
    provider: 'gemini',

    audioUrl: '/gemini/midnight-coffee.mp3',
  },
  {
    name: 'Velvet Current',
    theme: 'soft static',
    duration: 180,
    provider: 'claude',

    audioUrl: '/claude/velvet-current.mp3',
  },
  {
    name: 'Sunlit Dust',
    theme: 'golden dust',
    duration: 168,
    provider: 'claude',

    audioUrl: '/claude/sunlit-dust.mp3',
  },
  {
    name: 'Paper Cranes',
    theme: 'paper memory',
    duration: 168,
    provider: 'claude',

    audioUrl: '/claude/paper-cranes.mp3',
  },
  {
    name: 'Amber Glow',
    theme: 'golden dust',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/amber-glow.mp3',
  },
  {
    name: 'Rooftop Rain',
    theme: 'quiet rain',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/rooftop-rain.mp3',
  },
  {
    name: 'Worn Pages',
    theme: 'paper memory',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/worn-pages.mp3',
  },
  {
    name: 'Quiet Corners',
    theme: 'still water',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/quiet-corners.mp3',
  },
  {
    name: 'Copper Wire',
    theme: 'worn metal',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/copper-wire.mp3',
  },
  {
    name: 'Concrete Horizon',
    theme: 'distant horizon',
    duration: 153,
    provider: 'claude',

    audioUrl: '/claude/concrete-horizon.mp3',
  },
  {
    name: 'Iron Crown',
    theme: 'worn metal',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/iron-crown.mp3',
  },
  {
    name: 'Neon Drift',
    theme: 'night drive',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/neon-drift.mp3',
  },
  {
    name: 'Temple Garden',
    theme: 'sacred ground',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/temple-garden.mp3',
  },
  {
    name: 'Glass Factory',
    theme: 'sacred ground',
    duration: 132,
    provider: 'claude',

    audioUrl: '/claude/glass-factory.mp3',
  },
  {
    name: 'Midnight Arcade',
    theme: 'night drive',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/midnight-arcade.mp3',
  },
  {
    name: 'Desert Wind',
    theme: 'golden dust',
    duration: 147,
    provider: 'claude',

    audioUrl: '/claude/desert-wind.mp3',
  },
  {
    name: 'Velvet Static',
    theme: 'soft static',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/velvet-static.mp3',
  },
  {
    name: 'Solar Flare',
    theme: 'fading light',
    duration: 138,
    provider: 'claude',

    audioUrl: '/claude/solar-flare.mp3',
  },
  {
    name: 'Frozen Lake',
    theme: 'still water',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/frozen-lake.mp3',
  },
  {
    name: 'Cobalt Rain',
    theme: 'quiet rain',
    duration: 147,
    provider: 'claude',

    audioUrl: '/claude/cobalt-rain.mp3',
  },
  {
    name: 'Rust Belt',
    theme: 'worn metal',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/rust-belt.mp3',
  },
  {
    name: 'Silk Road',
    theme: 'distant horizon',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/silk-road.mp3',
  },
  {
    name: 'Quantum Dust',
    theme: 'distant horizon',
    duration: 132,
    provider: 'claude',

    audioUrl: '/claude/quantum-dust.mp3',
  },
  {
    name: 'City Lights',
    theme: 'fading light',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/city-lights.mp3',
  },
  {
    name: 'Hollow Crown',
    theme: 'paper memory',
    duration: 144,
    provider: 'claude',

    audioUrl: '/claude/hollow-crown.mp3',
  },
  {
    name: 'Phosphor Dreams',
    theme: 'fading light',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/phosphor-dreams.mp3',
  },
  {
    name: 'Signal Lost',
    theme: 'soft static',
    duration: 144,
    provider: 'claude',

    audioUrl: '/claude/signal-lost.mp3',
  },
]

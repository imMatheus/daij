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

    audioUrl: '/claude/late-night-drive.wav',
  },
  {
    name: 'Midnight Coffee',
    theme: 'quiet rain',
    duration: 130,
    provider: 'gemini',

    audioUrl: '/gemini/midnight-coffee.wav',
  },
  {
    name: 'Velvet Current',
    theme: 'soft static',
    duration: 180,
    provider: 'claude',

    audioUrl: '/claude/velvet-current.wav',
  },
  {
    name: 'Sunlit Dust',
    theme: 'golden dust',
    duration: 168,
    provider: 'claude',

    audioUrl: '/claude/sunlit-dust.wav',
  },
  {
    name: 'Paper Cranes',
    theme: 'paper memory',
    duration: 168,
    provider: 'claude',

    audioUrl: '/claude/paper-cranes.wav',
  },
  {
    name: 'Amber Glow',
    theme: 'golden dust',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/amber-glow.wav',
  },
  {
    name: 'Rooftop Rain',
    theme: 'quiet rain',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/rooftop-rain.wav',
  },
  {
    name: 'Worn Pages',
    theme: 'paper memory',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/worn-pages.wav',
  },
  {
    name: 'Quiet Corners',
    theme: 'still water',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/quiet-corners.wav',
  },
  {
    name: 'Copper Wire',
    theme: 'worn metal',
    duration: 155,
    provider: 'claude',

    audioUrl: '/claude/copper-wire.wav',
  },
  {
    name: 'Concrete Horizon',
    theme: 'distant horizon',
    duration: 153,
    provider: 'claude',

    audioUrl: '/claude/concrete-horizon.wav',
  },
  {
    name: 'Iron Crown',
    theme: 'worn metal',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/iron-crown.wav',
  },
  {
    name: 'Neon Drift',
    theme: 'night drive',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/neon-drift.wav',
  },
  {
    name: 'Temple Garden',
    theme: 'sacred ground',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/temple-garden.wav',
  },
  {
    name: 'Glass Factory',
    theme: 'sacred ground',
    duration: 132,
    provider: 'claude',

    audioUrl: '/claude/glass-factory.wav',
  },
  {
    name: 'Midnight Arcade',
    theme: 'night drive',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/midnight-arcade.wav',
  },
  {
    name: 'Desert Wind',
    theme: 'golden dust',
    duration: 147,
    provider: 'claude',

    audioUrl: '/claude/desert-wind.wav',
  },
  {
    name: 'Velvet Static',
    theme: 'soft static',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/velvet-static.wav',
  },
  {
    name: 'Solar Flare',
    theme: 'fading light',
    duration: 138,
    provider: 'claude',

    audioUrl: '/claude/solar-flare.wav',
  },
  {
    name: 'Frozen Lake',
    theme: 'still water',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/frozen-lake.wav',
  },
  {
    name: 'Cobalt Rain',
    theme: 'quiet rain',
    duration: 147,
    provider: 'claude',

    audioUrl: '/claude/cobalt-rain.wav',
  },
  {
    name: 'Rust Belt',
    theme: 'worn metal',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/rust-belt.wav',
  },
  {
    name: 'Silk Road',
    theme: 'distant horizon',
    duration: 150,
    provider: 'claude',

    audioUrl: '/claude/silk-road.wav',
  },
  {
    name: 'Quantum Dust',
    theme: 'distant horizon',
    duration: 132,
    provider: 'claude',

    audioUrl: '/claude/quantum-dust.wav',
  },
  {
    name: 'City Lights',
    theme: 'fading light',
    duration: 141,
    provider: 'claude',

    audioUrl: '/claude/city-lights.wav',
  },
  {
    name: 'Hollow Crown',
    theme: 'paper memory',
    duration: 144,
    provider: 'claude',

    audioUrl: '/claude/hollow-crown.wav',
  },
  {
    name: 'Phosphor Dreams',
    theme: 'fading light',
    duration: 135,
    provider: 'claude',

    audioUrl: '/claude/phosphor-dreams.wav',
  },
  {
    name: 'Signal Lost',
    theme: 'soft static',
    duration: 144,
    provider: 'claude',

    audioUrl: '/claude/signal-lost.wav',
  },
]

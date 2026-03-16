export function PlayingWave({ theme }: { theme: 'white' | 'black' }) {
  const color = theme === 'white' ? '#fff' : '#000'

  return (
    <div
      className="flex items-end justify-center gap-px"
      style={{ height: 14 }}
    >
      <div
        className="w-[3px]"
        style={{
          backgroundColor: color,
          animation: `playingWave 800ms ease-in-out -1s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: color,
          animation: `playingWave 800ms ease-in-out -0.3s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: color,
          animation: `playingWave 800ms ease-in-out -2s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: color,
          animation: `playingWave 800ms ease-in-out -1.4s infinite alternate`,
        }}
      />
    </div>
  )
}

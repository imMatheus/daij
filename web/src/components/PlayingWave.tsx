export function PlayingWave() {
  return (
    <div
      className="flex items-end justify-center gap-px"
      style={{ height: 14 }}
    >
      <div
        className="w-[3px]"
        style={{
          backgroundColor: 'var(--key-color)',
          animation: `playingWave 800ms ease-in-out -1s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: 'var(--key-color)',
          opacity: 0.7,
          animation: `playingWave 800ms ease-in-out -0.3s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: 'var(--key-color)',
          animation: `playingWave 800ms ease-in-out -2s infinite alternate`,
        }}
      />
      <div
        className="w-[3px]"
        style={{
          backgroundColor: 'var(--key-color)',
          opacity: 0.7,
          animation: `playingWave 800ms ease-in-out -1.4s infinite alternate`,
        }}
      />
    </div>
  )
}

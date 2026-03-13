export function PlayingWave() {
  return (
    <div
      className="flex items-end justify-center gap-px"
      style={{ height: 14 }}
    >
      <div
        className="flex w-[3px] flex-col"
        style={{
          backgroundColor: 'var(--bg)',
          animation: `playingWave 800ms ease-in-out -1s infinite alternate`,
        }}
      >
        <div className="bg-bg w-full flex-1" />
        <div className="bg-accent w-full flex-1" />
        <div className="bg-bg w-full flex-1" />
      </div>

      <div
        className="flex w-[3px] flex-col"
        style={{
          backgroundColor: 'var(--bg)',
          animation: `playingWave 800ms ease-in-out -0.3s infinite alternate`,
        }}
      >
        <div className="bg-bg w-full flex-1" />
        <div className="bg-accent w-full flex-1" />
      </div>

      <div
        className="flex w-[3px] flex-col"
        style={{
          backgroundColor: 'var(--bg)',
          animation: `playingWave 800ms ease-in-out -2s infinite alternate`,
        }}
      >
        <div className="bg-accent w-full flex-1" />
        <div className="bg-bg w-full flex-1" />
        <div className="bg-accent w-full flex-1" />
        <div className="bg-bg w-full flex-1" />
      </div>

      <div
        className="flex w-[3px] flex-col"
        style={{
          backgroundColor: 'var(--bg)',
          animation: `playingWave 800ms ease-in-out -1.4s infinite alternate`,
        }}
      >
        <div className="bg-accent w-full flex-1" />
        <div className="bg-bg w-full flex-1" />
      </div>
    </div>
  )
}

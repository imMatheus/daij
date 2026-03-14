const BARS = [
  { width: 64, height: 8 },
  { width: 48, height: 7 },
  { width: 34, height: 6 },
]

export const Loader = () => {
  return (
    <div className="flex flex-col items-center gap-0 py-8">
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: bar.width,
            height: bar.height,
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%), rgb(var(--key-color-base))',
            boxShadow: `inset 0 0 3px 1px rgba(255, 255, 255, 0.22), inset 0 0 6px 0px rgba(255, 255, 255, 0.06), 0 1px 5px rgba(var(--key-color-base) / 0.29), 0 1px 8px rgba(var(--key-color-base) / 0.14)`,
            animation: `loaderPulse 1.4s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes loaderPulse {
            0%, 100% { opacity: 0.4; transform: scaleX(0.85); }
            50% { opacity: 1; transform: scaleX(1); }
          }
        `}
      </style>
    </div>
  )
}

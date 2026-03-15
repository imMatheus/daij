export const Footer = () => {
  return (
    <footer className="bg-surface pt-20 pb-52">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="border-divider border-t pt-6">
          <div className="flex items-center justify-between">
            <p className="">daij — AI-generated music experiment</p>
            <div className="flex gap-4">
              <a
                href="https://x.com/whosmatu"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com/immatheus/daij"
                target="_blank"
                className="hover:text-secondary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

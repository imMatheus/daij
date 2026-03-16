export const Footer = () => {
  // return (
  //   <footer className="bg-surface pt-20 pb-52">
  //     <div className="mx-auto w-full max-w-6xl px-5">
  //       <div className="border-divider border-t pt-6">
  //         <div className="flex items-center justify-between">
  //           <p className="">daij — AI-generated music experiment</p>
  //           <div className="flex gap-4">
  //             <a
  //               href="https://x.com/whosmatu"
  //               target="_blank"
  //               className="hover:text-secondary transition-colors"
  //             >
  //               Twitter
  //             </a>
  //             <a
  //               href="https://github.com/immatheus/daij"
  //               target="_blank"
  //               className="hover:text-secondary transition-colors"
  //             >
  //               GitHub
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // )

  return (
    <footer
      className="mt-10 pt-20 pb-40"
      style={{
        background:
          'url(https://cdn.midjourney.com/9490c3d5-9dc7-46c7-b27f-51d83ff07db7/0_0.png) no-repeat center center',
        backgroundSize: 'cover',
      }}
    >
      {/* <footer className="pt-20 pb-40 mt-10" style={{ background: 'url(https://cdn.midjourney.com/a837b61a-df36-44ab-a6c3-7f5f6c6e0064/0_0.png) no-repeat center center', backgroundSize: 'cover', }}> */}
      <div className="mx-auto w-full max-w-4xl px-5">
        <div
          className="rounded-full px-10 py-6"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            boxShadow:
              'inset 0 0 0 0.5px rgba(255, 255, 255, 0.6), 0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-black/70">
              daij — AI-generated music experiment
            </p>
            <div className="flex gap-4 text-sm font-medium text-black/50">
              <a
                href="https://x.com/whosmatu"
                target="_blank"
                className="transition-colors hover:text-black/80"
              >
                Twitter
              </a>
              <a
                href="https://github.com/immatheus/daij"
                target="_blank"
                className="transition-colors hover:text-black/80"
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

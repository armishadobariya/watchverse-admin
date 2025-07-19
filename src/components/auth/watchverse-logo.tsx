import React from "react"
import Logo from "static/icons/logo.svg"

const WatchVerseLogo = () => {
  return (
    <div className="mx-auto hidden h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-slate-950 py-28 md:flex ">
      <div>
        {/* <Logo width={100} height={100} className="mx-auto" /> */}
        <Logo className="text-teal size-[170px]" />
      </div>
      <div className="text-teal justify-center text-4xl font-bold">
        WatchVerse
      </div>
    </div>
  )
}

export default WatchVerseLogo

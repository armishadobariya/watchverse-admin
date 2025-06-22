import Image from "next/image"
import React from "react"

const WatchVerseLogo = () => {
  return (
    <div className="mx-auto hidden h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-slate-950 py-28 md:flex">
      <div>
        {/* <Logo width={100} height={100} className="mx-auto" /> */}
        <Image src={"/icons/logo.svg"} width={170} height={170} alt="logo" />
      </div>
      <div className="text-bronze justify-center text-4xl font-bold">
        WatchVerse
      </div>
    </div>
  )
}

export default WatchVerseLogo

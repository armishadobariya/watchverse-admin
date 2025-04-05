import Image from "next/image";
import React from "react";

const WatchVerseLogo = () => {
    return (
        <div className="bg-slate-950 h-full rounded-2xl mx-auto  flex-col gap-4 w-full justify-center items-center py-28 md:flex hidden">
            <div>
                {/* <Logo width={100} height={100} className="mx-auto" /> */}
                <Image src={"/icons/logo.svg"} width={170} height={170} alt="logo" />
            </div>
            <div className="text-4xl text-bronze justify-center font-bold">
                WatchVerse
            </div>
        </div>
    );
};

export default WatchVerseLogo;

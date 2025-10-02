import Image from "next/image"
import React from "react"

const NoDataFound = ({
  title,
  desc,
  className,
}: {
  title?: string
  desc?: string
  className?: string
}) => {
  return (
    <div className={`w-full max-w-[270px] py-[50px] ${className || ""}`}>
      <div className="flex justify-center">
        <Image
          src={"/images/no-data-found.jpg"}
          width={180}
          height={132}
          alt="no data"
        />
      </div>
      <div className="grid gap-1">
        {title && (
          <h2 className="text-sub text-center text-lg leading-6 font-semibold">
            {title}
          </h2>
        )}
        {desc && (
          <p className="text-sub text-center text-sm font-normal">{desc}</p>
        )}
      </div>
    </div>
  )
}

export default NoDataFound

"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { FieldError } from "react-hook-form"
import { type VariantProps, tv } from "tailwind-variants"

import Loader from "../common/loader"
import { Label } from "./label"

const inputStyles = tv({
  base: [
    // base
    "text-sm relative block w-full appearance-none truncate rounded-md border px-3 py-[10px] shadow-xs transition outline-none",
    // border color
    "border-gray-200",
    // text color
    "text-main",
    // placeholder color
    "placeholder-text-sub",
    // background color
    "bg-bg-white-0",
    // disabled
    "disabled:text-sub disabled:cursor-not-allowed disabled:border-gray-200 disabled:opacity-90",
    // file
    [
      "file:-my-1.5 file:-ml-2.5 file:h-[36px] file:cursor-pointer file:rounded-[12px] file:rounded-r-none file:border-0 file:px-3 file:py-[10px] file:outline-none focus:outline-none",
      "file:disabled:cursor-not-allowed file:disabled:opacity-70",
      "file:border-gray-200",
      "file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px]",
      "file:disabled:text-sub-text file:disabled:bg-gray-50",
    ],
    // focus
    [
      // base
      "focus:ring-1",
      // ring color
      "focus:ring-stroke-soft-200",
      // border color
      "focus:border-stroke-strong-900",
    ],
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
    // remove search cancel button (optional)
    "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  variants: {
    hasError: {
      true: [
        // base
        "text-red medium-md placeholder:text-sub ring-1",
        // border color
        "border-red",
        // ring color
        "ring-red",
      ],
    },
    // number input
    enableStepper: {
      true: "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    },
  },
})

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  error?: FieldError | undefined
  inputClassName?: string
  label?: string
  loader?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className,
      inputClassName,
      type,
      label,
      loader,
      prefix,

      ...props
    }: InputProps,
    forwardedRef,
  ) => {
    const [typeState, setTypeState] = React.useState(type)

    const isPassword = type === "password"
    const isSearch = type === "search"
    const hasPrefix = Boolean(prefix)

    return (
      <div className={cn("relative w-full", className)}>
        {label && <Label className="medium-md text-main mb-2">{label}</Label>}
        {hasPrefix && (
          <div
            className={cn("absolute top-1/2 left-3", "text-main-text", {
              "pr-0": type === "number",
            })}
          >
            {prefix}
          </div>
        )}
        <input
          ref={forwardedRef}
          type={isPassword ? typeState : type}
          className={cn(
            inputStyles({ hasError: Boolean(error?.message) }),
            "relative",
            {
              "pl-8": isSearch,
              "pr-10": isPassword,
              "pl-6": hasPrefix,
            },
            inputClassName,
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red mt-1 ml-[2px]">{error?.message}</p>
        )}
        {loader && (
          <div className="absolute top-8 right-3">
            <Loader className="validate-loader" />
          </div>
        )}
        {isSearch && (
          <div
            className={cn(
              // base
              "pointer-events-none absolute bottom-0 left-2 flex h-full items-center justify-center",
              // text color
              "text-main",
            )}
          >
            {/* <RiSearchLine
              className="size-[1.125rem] shrink-0"
              aria-hidden="true"
            /> */}
          </div>
        )}
        {isPassword && (
          <div
            className={cn(
              "absolute top-1/2 right-0 flex items-center justify-center px-3",
            )}
          >
            <button
              aria-label="Change password visibility"
              className={cn(
                // base
                "h-fit w-fit rounded-sm transition-all outline-none",
                // text
                "text-main-text",
                // hover
                "hover:text-text-disabled-300",
                [
                  // base
                  "outline-0 outline-offset-2 focus-visible:outline-2",
                  // outline color
                  "outline-stroke-soft-200",
                ],
              )}
              type="button"
              onClick={() => {
                setTypeState(typeState === "password" ? "text" : "password")
              }}
            >
              <span className="sr-only">
                {typeState === "password" ? "Show password" : "Hide password"}
              </span>
              {/* {typeState === "password" ? (
                <RiEyeFill aria-hidden="true" className="size-5 shrink-0" />
              ) : (
                <RiEyeOffFill aria-hidden="true" className="size-5 shrink-0" />
              )} */}
            </button>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input, inputStyles, type InputProps }

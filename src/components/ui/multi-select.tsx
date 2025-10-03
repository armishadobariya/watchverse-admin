import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { ChevronDown, X } from "lucide-react"
import * as React from "react"

import { Checkbox } from "./checkbox"

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */

const multiSelectVariants = cva("m-0", {
  variants: {
    variant: {
      default:
        "border-foreground/10 text-foreground bg-card hover:bg-card/80 capitalize normal-case        ",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string | number
    /** The unique value associated with the option. */
    value: string
    name?: string
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>
  }[]

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void

  /** The default selected values when the component mounts. */
  defaultValue?: string[]

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",

      maxCount = 3,
      variant,
      modalPopover = false,
      // asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    // const handleInputKeyDown = (
    //   event: React.KeyboardEvent<HTMLInputElement>,
    // ) => {
    //   if (event.key === "Enter") {
    //     setIsPopoverOpen(true)
    //   } else if (event.key === "Backspace" && !event.currentTarget.value) {
    //     const newSelectedValues = [...selectedValues]
    //     newSelectedValues.pop()
    //     setSelectedValues(newSelectedValues)
    //     onValueChange(newSelectedValues)
    //   }
    // }

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option]
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const handleClear = () => {
      setSelectedValues([])
      onValueChange([])
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount)
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear()
      } else {
        const allValues = options?.map((option) => option?.value)
        setSelectedValues(allValues)
        onValueChange(allValues)
      }
    }

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex h-10  w-full items-center justify-between rounded-md border bg-inherit p-1.5 hover:bg-inherit [&_svg]:pointer-events-auto",
              className,
            )}
            variant={"default"}
          >
            {selectedValues?.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues?.slice(0, maxCount)?.map((value) => {
                    const option = options?.find((o) => o.value === value)
                    // const IconComponent = option?.icon
                    return (
                      <div
                        key={value}
                        className={cn(
                          multiSelectVariants({ variant }),
                          "text-main text-xs flex items-center rounded-sm bg-accent p-1 px-1.5",
                        )}
                      >
                        {/* {IconComponent && (
                          <IconComponent className="mr-2 h-4 w-4" />
                        )} */}

                        <span className="max-w-14 truncate">
                          {option?.label}
                        </span>
                        <Separator
                          className="mx-1.5 !h-2.5 w-[2px] bg-gray-500"
                          orientation="vertical"
                        />
                        <X
                          className="size-3 cursor-pointer"
                          onClick={(event: React.MouseEvent) => {
                            event.stopPropagation()
                            toggleOption(value)
                          }}
                        />
                      </div>
                    )
                  })}
                  {selectedValues.length > maxCount && (
                    <div className="text-main text-xs flex items-center rounded-sm bg-accent p-1 px-1.5">
                      {`+ ${selectedValues.length - maxCount} more`}
                      <Separator
                        className="mx-2 !h-5 w-[2px]"
                        orientation="vertical"
                      />
                      <X
                        className="size-3 cursor-pointer"
                        onClick={(event: React.MouseEvent) => {
                          event.stopPropagation()
                          clearExtraOptions()
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
                </div>
              </div>
            ) : (
              <div className="text-sub mx-auto flex w-full items-center justify-between">
                {/* <span className="text-sub- mx-3 text-sm !capitalize"> */}
                {placeholder}
                {/* </span> */}
                <ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[390px] p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            {/* <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            /> */}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer px-3 py-2"
                >
                  <Checkbox
                    checked={selectedValues?.length === options?.length}
                  />
                  <span>(Select All)</span>
                </CommandItem>
                {options?.map((option) => {
                  const isSelected = selectedValues?.includes(option?.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className={`text-main b4-regular cursor-pointer px-3 py-2`}
                    >
                      <Checkbox checked={isSelected} className="text-white" />
                      <span>
                        {option.label}
                        {option.name && ` (${option.name})`}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
            <div className="border-t">
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <button
                      onClick={handleClear}
                      className="hover:bg-accent text-red flex-1 cursor-pointer justify-center px-3 py-2 text-sm"
                    >
                      Clear All
                    </button>
                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}
              </div>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)

MultiSelect.displayName = "MultiSelect"

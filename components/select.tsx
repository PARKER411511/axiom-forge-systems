"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type { ComponentPropsWithoutRef } from "react";

const EMPTY_VALUE = "__axiom_select_empty__";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  id?: string;
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>["aria-invalid"];
};

function ChevronDown() {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true" focusable="false">
      <path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function Checkmark() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="m2.2 6.2 2.45 2.45L9.8 3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function Select({
  id,
  name,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue === EMPTY_VALUE ? "" : nextValue)}
      name={name}
      required={required}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        id={id}
        className={`custom-select-trigger field ${className}`.trim()}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="custom-select-icon">
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="custom-select-content" position="popper" sideOffset={6} collisionPadding={12} align="start">
          <SelectPrimitive.ScrollUpButton className="custom-select-scroll-button">↑</SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="custom-select-viewport">
            {options.map((option) => (
              <SelectPrimitive.Item
                className="custom-select-item"
                key={option.value || EMPTY_VALUE}
                value={option.value || EMPTY_VALUE}
                disabled={option.disabled}
                textValue={option.label}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="custom-select-item-indicator">
                  <Checkmark />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="custom-select-scroll-button">↓</SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

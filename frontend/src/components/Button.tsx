import React from "react";
import clsx from "clsx";
import {
  baseButton,
  variantStyles,
  variantOutlineStyles,
  sizeStyles,
  ButtonVariant,
  ButtonSize,
} from "./Button.styles";

type ButtonOnlyProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  href?: never;
  
};

type AnchorOnlyProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};

type BaseProps = {
  isDisabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  outline?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  "aria-label"?: string;
  className?: string;
};

export type ButtonProps = BaseProps & (ButtonOnlyProps | AnchorOnlyProps);

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = "primary",
    size = "md",
    outline = false,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth,
    isDisabled,
    className,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  // 동적 타입 가드 (as === "a" 여부로 구분)
  const isAnchor = (rest as AnchorOnlyProps).as === "a";
  const disabled = isDisabled || loading;
  console.log(disabled)

  // style 조합
  // disabled:pointer-events-none
  const classes = clsx(
    baseButton,
    outline ? variantOutlineStyles[variant] : variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  const content = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>
        {loading && loadingText ? loadingText : children}
      </span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  // a 태그
  if (isAnchor) {
    const { href, ...anchorProps } = rest as AnchorOnlyProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // button 태그
  const { ...buttonProps } = rest as ButtonOnlyProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

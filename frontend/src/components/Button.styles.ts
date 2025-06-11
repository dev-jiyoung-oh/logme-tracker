export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "none" | "h-underline";
export type ButtonSize = "sm" | "md" | "lg";

// 베이스(공통) 스타일
export const baseButton =
  "inline-flex items-center justify-center rounded font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

// variant 스타일
export const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
  secondary:
    "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600",
  danger:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
  ghost:
    "bg-transparent text-gray-800 hover:bg-gray-100 border border-transparent focus-visible:ring-gray-400",
  none:
    "bg-none border-none shadow-none text-inherit px-0 py-0 m-0 hover:bg-none focus:outline-none focus:ring-0",
  "h-underline":
    "bg-none border-none shadow-none text-inherit px-0 py-0 m-0 hover:bg-none focus:outline-none focus:ring-0 hover:underline",
};

// outline 스타일
export const variantOutlineStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600",
  secondary:
    "bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-50 focus-visible:ring-blue-400",
  danger:
    "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 focus-visible:ring-red-500",
  ghost:
    "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400",
  none:
    "",
  "h-underline":
    ""
};

// 크기별 스타일
export const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

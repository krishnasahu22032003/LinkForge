import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: `
    relative text-white
    bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)]
    shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_24px_-8px_rgba(99,102,241,0.55)]
    hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_12px_36px_-6px_rgba(99,102,241,0.7)]
    hover:-translate-y-[1px]
    active:translate-y-0 active:brightness-95
    before:absolute before:inset-0 before:rounded-[inherit]
    before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
    before:translate-x-[-150%] before:skew-x-[-20deg]
    hover:before:translate-x-[150%]
    before:transition-transform before:duration-700 before:ease-out
    overflow-hidden
  `,
  secondary: `
    bg-[rgba(255,255,255,0.05)] text-[var(--color-text)]
    border border-[var(--color-border)]
    hover:bg-[rgba(255,255,255,0.09)] hover:border-[var(--color-border-hover)]
    hover:-translate-y-[1px]
    active:translate-y-0 active:bg-[rgba(255,255,255,0.07)]
    shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]
  `,
  ghost: `
    bg-transparent text-[var(--color-text-muted)]
    hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)]
    active:bg-[rgba(255,255,255,0.08)]
  `,
  outline: `
    bg-transparent text-[var(--color-text)]
    border border-[var(--color-border)]
    hover:border-[var(--color-accent)] hover:text-[var(--color-accent-pale)]
    hover:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]
    hover:-translate-y-[1px]
    active:translate-y-0
  `,
  danger: `
    bg-[rgba(248,113,113,0.08)] text-[#FCA5A5]
    border border-[rgba(248,113,113,0.2)]
    hover:bg-[rgba(248,113,113,0.14)] hover:border-[rgba(248,113,113,0.4)]
    hover:shadow-[0_0_20px_-4px_rgba(248,113,113,0.4)]
    hover:-translate-y-[1px]
    active:translate-y-0
  `,
};

const sizeStyles: Record<Size, string> = {
  sm: "text-[13px] px-3.5 py-1.5 gap-1.5 rounded-[8px]",
  md: "text-[14px] px-5 py-2.5 gap-2 rounded-[10px]",
  lg: "text-[15px] px-6 py-3.5 gap-2.5 rounded-[12px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center
          font-medium leading-none tracking-tight
          transition-all duration-200 ease-out
          active:scale-[0.97]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
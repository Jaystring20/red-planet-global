import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[1320px] px-5 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

type Tone = "bone" | "dim" | "ink" | "oxblood";

const toneClass: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  dim: "bg-bone-dim text-ink",
  ink: "bg-ink text-bone",
  oxblood: "bg-oxblood text-bone",
};

export function Section({
  children,
  tone = "bone",
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx(toneClass[tone], "py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

/**
 * Small uppercase section label. Budgeted: see the eyebrow count rule in the plan.
 * Signal red only clears WCAG AA on the light ground, so dark sections use gold.
 */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "font-mono text-[11px] uppercase tracking-[0.2em]",
        onDark ? "text-gold" : "text-signal",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  level = 2,
  size = "lg",
  className,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  const sizes = {
    xl: "text-[2.4rem] sm:text-[3rem] lg:text-[3.35rem] font-semibold",
    lg: "text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold",
    md: "text-2xl sm:text-[1.75rem] font-semibold",
    sm: "text-lg sm:text-xl font-semibold",
  };
  return <Tag className={cx("display", sizes[size], className)}>{children}</Tag>;
}

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("measure text-base leading-relaxed sm:text-lg", className)}>
      {children}
    </p>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";

const variantClass: Record<ButtonVariant, string> = {
  // 4.85:1 against white text.
  primary:
    "bg-signal text-white hover:bg-signal-deep border border-transparent",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-bone",
  ghost:
    "bg-transparent text-ink border border-hairline hover:border-ink",
  onDark:
    "bg-bone text-ink border border-transparent hover:bg-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[2px] px-6 py-3 text-sm font-medium transition-all duration-200 active:translate-y-px",
        variantClass[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Hairline({ dark = false }: { dark?: boolean }) {
  return (
    <hr
      className={cx("border-0 border-t", dark ? "border-hairline-dark" : "border-hairline")}
    />
  );
}

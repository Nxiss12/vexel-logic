"use client";
import cx from 'clsx';

export default function Button({ children, variant = 'solid', className = '', href, target, ...props }: any) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition';
  const variants: Record<string, string> = {
    solid: 'bg-brand text-white',
    outline: 'border bg-white/0'
  };
  const cls = cx(base, variants[variant] || '', className);
  if (href) {
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
    return (
      <a className={cls} href={href} target={target} rel={rel} {...props}>{children}</a>
    );
  }
  return (
    <button className={cls} {...props}>{children}</button>
  );
}

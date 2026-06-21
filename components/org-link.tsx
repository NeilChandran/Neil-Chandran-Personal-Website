type OrgLinkProps = {
  href: string
  label: string
  className?: string
}

export function OrgLink({ href, label, className }: OrgLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-medium text-foreground border-b border-dashed border-foreground/40 hover:border-solid hover:border-red-500 pb-[1px] ${className ?? ""}`}
    >
      {label}
    </a>
  )
}

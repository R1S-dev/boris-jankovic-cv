export default function ModalBlock({ title, right, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-line bg-white/5 p-4 ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between gap-3">
          {title ? <div className="text-sm font-semibold">{title}</div> : <div />}
          {right}
        </div>
      )}
      <div className={title || right ? "mt-3" : ""}>{children}</div>
    </div>
  )
}

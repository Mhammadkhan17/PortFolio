export function StaticGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "linear-gradient(180deg, #0A0A0F 0%, #0D1214 35%, #1A1F22 60%, #F5F3EF 100%)",
      }}
    />
  )
}

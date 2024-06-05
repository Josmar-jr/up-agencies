export function DotBackground() {
  return (
    <div className="bg-dot-white/[0.5] relative flex h-full w-full items-center justify-center bg-primary">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-3xl font-bold text-transparent sm:text-7xl">
        Up Agencies
      </p>
    </div>
  )
}

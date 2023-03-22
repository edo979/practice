export default function GradientBackground() {
  return (
    <div
      className="w-64 aspect-square m-0 p-0  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[49%] rounded-full -z-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, hsla(0, 0%, 100%, 13%) 0 48%, hsla(0, 0%, 100%, 6%) 48% 60%, hsla(0, 0%, 100%, 3%) 60% 100%)',
      }}
    ></div>
  )
}

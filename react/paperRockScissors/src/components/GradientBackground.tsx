export default function GradientBackground() {
  return (
    <div
      className="w-60 aspect-square rounded-full"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, hsla(0, 0%, 100%, 25%) 0 40%, hsla(0, 0%, 100%, 15%) 40% 55%, hsla(0, 0%, 100%, 5%) 55% 100%)',
      }}
    ></div>
  )
}

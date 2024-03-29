import { createSignal } from 'solid-js'

export default function Wallpaper({ image }: { image?: string }) {
  const [imageSrc] = createSignal(image || '/backgrounds/mountain.png')

  return (
    <div class="fixed top-0 left-0 -z-[9999]">
      <img src={imageSrc()} class="h-screen w-screen" />
    </div>
  )
}

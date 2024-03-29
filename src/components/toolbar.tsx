import { createSignal, onCleanup } from 'solid-js'
import { openWindows, activeWindow, toggleWindowMinimize, setActiveWindow, createWindow } from '../lib/windows'
import moment from 'moment'
import { v4 } from 'uuid'

export default function Toolbar() {
  const [date, setDate] = createSignal({
    date: moment().format('MMM Do[,] YYYY'),
    time: moment().format('h:mm a')
  })

  const interval = setInterval(() => {
    setDate({
      date: moment().format('MMM Do[,] YYYY'),
      time: moment().format('h:mm a')
    })
  }, 1000)

  onCleanup(() => {
    clearInterval(interval)
  })

  return (
    <div class="fixed bottom-2.5 w-screen h-[3.75rem] px-72 rounded-md z-[999]">
      <div class="flex-1 h-full rounded-full bg-white/20  backdrop-blur-lg border-white/15 border-2 flex items-center justify-between px-4">
        <span class="flex items-center gap-4">
          <img
            src="/icon.png"
            class="h-9 aspect-square active:rotate-[360deg] duration-500"
            onClick={() => {
              createWindow({
                title: 'App',
                content: <p>hi</p>,
                id: v4()
              })
            }}
          />

          {openWindows.map((item) => {
            return (
              <div
                onClick={() => {
                  if (item.id == activeWindow()) {
                    console.log('active window is being targeted')
                    setActiveWindow(null)
                    toggleWindowMinimize({ id: item.id })
                  } else if (item.isMinimized) {
                    console.log('a minimzed window is being targeted')
                    setActiveWindow(item.id)
                    toggleWindowMinimize({ id: item.id })
                  } else if (item.id !== activeWindow()) {
                    setActiveWindow(item.id)
                  }
                }}
                class={`h-9 aspect-square bg-white/20 rounded-md ${activeWindow() == item.id ? 'border-white/30 border' : 'border-none'}`}
              ></div>
            )
          })}
        </span>

        <span class="flex items-center gap-4">
          <span class="flex flex-col items-center text-sm">
            <p>{date().time}</p>
            <p>{date().date}</p>
          </span>
        </span>
      </div>
    </div>
  )
}

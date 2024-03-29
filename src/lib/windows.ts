import { createStore } from 'solid-js/store'
import { AppWindow } from './types'
import { JSX, createSignal } from 'solid-js'
import { v4 as uuid } from 'uuid'

export const [openWindows, setOpenWindows] = createStore<AppWindow[]>([])
export const [activeWindow, setActiveWindow] = createSignal<string | null>(null)

export function toggleWindowMinimize(options: { id: string }) {
  setOpenWindows((prev) => {
    const newWindows = [...prev]
    const windowIndex = newWindows.findIndex((window) => window.id === options.id)

    if (windowIndex !== -1) {
      const window = newWindows[windowIndex]
      newWindows[windowIndex] = { ...window, isMinimized: !window.isMinimized } // update the item in the new array
    }

    return newWindows
  })
}

export function createWindow(options: { title: string; id: string; content: JSX.Element }) {
  const newWindow = {
    title: options.title,
    id: uuid(),
    isActive: true,
    isMinimized: false,
    content: options.content
  }

  setOpenWindows((prev) => [...prev, newWindow])

  setActiveWindow(newWindow.id)

  return newWindow
}

export function closeWindow(options: { id: string }) {
  setOpenWindows((i) => i.filter((item) => item.id !== options.id))
}

import { JSX, JSXElement } from 'solid-js'

export interface AppWindow {
  title: string
  id: string
  isMinimized: boolean
  isActive: boolean,
  content?: JSXElement
}

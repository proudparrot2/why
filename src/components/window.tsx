import { createSignal, onMount } from 'solid-js'
import clsx from 'clsx'
import interact from 'interactjs'
import { activeWindow, closeWindow, setActiveWindow, toggleWindowMinimize } from '../lib/windows'
import { AppWindow } from '../lib/types'
import { Motion } from 'solid-motionone'

export default function AppWin(props: { data: AppWindow }) {
  const [xPos, setXPos] = createSignal(300)
  const [yPos, setYPos] = createSignal(200)
  const [width, setWidth] = createSignal(750)
  const [height, setHeight] = createSignal(450)

  var windowRef: HTMLDivElement
  var handleRef: HTMLDivElement
  var controlRef: HTMLDivElement

  onMount(() => {
    interact(windowRef!)
      .draggable({
        allowFrom: handleRef!,
        ignoreFrom: controlRef!,
        listeners: {
          move: (event) => {
            setXPos((prev) => prev + event.dx)
            setYPos((prev) => prev + event.dy)
          }
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: false
          })
        ]
      })
      .resizable({
        ignoreFrom: controlRef!,
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          move: function (event) {
            setXPos((prev) => (prev || 0) + event.deltaRect.left)
            setYPos((prev) => (prev || 0) + event.deltaRect.top)
            setWidth(event.rect.width)
            setHeight(event.rect.height)
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 200, height: 150 },
            max: 'parent'
          }),
          interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: false
          })
        ]
      })
  })

  return (
    <Motion.div
      ref={windowRef!}
      class="fixed"
      style={{}}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: props.data.isMinimized ? 0 : 1,
        y: props.data.isMinimized ? 20 : 0,
        width: width() + 'px',
        height: height() + 'px',
        top: yPos() + 'px',
        left: xPos() + 'px',
        'z-index': activeWindow() == props.data.id ? '10' : '1'
      }}
      transition={{
        duration: 0.2,
        top: {
          duration: 0
        },
        left: {
          duration: 0
        },
        width: {
          duration: 0
        },
        height: {
          duration: 0
        }
      }}
      exit={{ opacity: 0, y: 20 }}
      onMouseDown={() => {
        setActiveWindow(props.data.id)
      }}
    >
      <div ref={handleRef!} class="h-9 bg-neutral-600/40 /40 flex items-center px-4 rounded-t-lg backdrop-blur-lg">
        <div ref={controlRef!} class="flex gap-1.5">
          <div class={clsx(`h-3.5 w-3.5 hover:bg-red-400/80 rounded-full`, activeWindow() == props.data.id ? 'bg-red-400' : 'bg-gray-400')} onClick={() => closeWindow({ id: props.data.id })} />
          <div
            class={clsx(`h-3.5 w-3.5 hover:bg-yellow-400/80 rounded-full`, activeWindow() == props.data.id ? 'bg-yellow-400' : 'bg-gray-400')}
            onClick={() => {
              toggleWindowMinimize({ id: props.data.id })
              setActiveWindow(null)
            }}
          />
          <div class={`h-3.5 w-3.5 ${activeWindow() == props.data.id ? 'bg-green-400' : 'bg-gray-400'} hover:bg-green-400/80 rounded-full`} />
        </div>

        <h1 class="absolute left-1/2 -translate-x-1/2">{props.data.title}</h1>
      </div>
      <div class="h-[calc(100%-2.5rem)] w-full overflow-auto bg-white/35 backdrop-blur-lg rounded-b-lg">
        <p>id: {props.data.id}</p>
        <p>x: {xPos()}</p>
        <p>y: {yPos()}</p>
        <p>height: {height()}</p>
        <p>width: {width()}</p>
        <p>minimized: {props.data.isMinimized ? 'true' : 'false'}</p>
        <p>focused: {props.data.id == activeWindow() ? 'true' : 'false'}</p>
      </div>
    </Motion.div>
    // <p>Hello</p>
  )
}

import { For, Index } from 'solid-js'
import { openWindows } from '../lib/windows'
import AppWin from './window'

import { Presence } from 'solid-motionone'

export default function Desktop() {
  return (
    <>
      <div class="h-screen w-screen">
        <Presence exitBeforeEnter>
          <Index each={openWindows}>{(data) => <AppWin data={data()} />}</Index>
        </Presence>
      </div>
      <p class="absolute top-0 left-0">{openWindows.length}</p>
    </>
  )
}

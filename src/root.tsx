import { render } from 'solid-js/web'

import WindowContainer from './components/windowcontainer'
import Wallpaper from './components/wallpaper'
import Toolbar from './components/toolbar'
import { fetchApp } from './lib/apphandler'
import './index.css'

const root = document.getElementById('root')

function Root() {
  // const app = fetchApp('/apps/demo')
  return (
    <>
      <Wallpaper />
      <WindowContainer />
      <Toolbar />
    </>
  )
}

render(() => <Root />, root!)

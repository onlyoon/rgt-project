import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Providers } from './providers'

function App() {

  return (
    <Providers>
      <header>
        <Navbar />
      </header>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </Providers>
  )
}

export default App

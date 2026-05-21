import './App.css'
import { TooltipProvider } from './components/ui/tooltip'
import { Header } from './layout/Header'
import { Main } from './layout/Main'

function App() {

  return (
    <>
      <TooltipProvider>
        <div className='h-screen overflow-auto flex flex-col'>
          <Header/>
          <Main/>
        </div>
      </TooltipProvider>
    </>
  )
}

export default App

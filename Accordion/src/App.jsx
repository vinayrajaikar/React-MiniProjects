import './App.css'
// import './style.css';
import Accordian from './components/accordian/Accordian'

function App() {
 

  return (
  <>  
    <div className='App border border-black rounded-md p-4'>
      <header className='App-header'>
        <h1 className='text-3xl font-large'>Accordion</h1>
        <Accordian/>

      </header>
    </div>
  </>
  )
}

export default App

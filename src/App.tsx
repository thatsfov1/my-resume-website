import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import About from "./pages/About";

function App() {
  return (
    <main className='bg-slate-300/20 h-full'>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/projects' element={<Projects/>}/>
            </Routes>
        </BrowserRouter>
    </main>
  )
}

export default App

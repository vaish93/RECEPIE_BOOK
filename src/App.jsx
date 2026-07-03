import { useState ,useEffect} from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import RecepieDetails from './pages/RecepieDetailsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import recepieContext from './context/RecepieContext.js'
import axios from 'axios'


function App() {

  const [recepies, setRecepies] = useState([])

    useEffect(() => {
        const fetchrecepies = async () => {
            try {
                const resp = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
                const data = await resp.data.meals
                setRecepies(data)  
            } catch {
                console.log("error")
            }
        }
        fetchrecepies()


    }, [])

  return (
    <>
    <Header />
    <BrowserRouter>
     <recepieContext.Provider value={recepies}>
      <Routes>
        <Route path = "/"  element = {<HomePage/>} />
        <Route path = "/RecepieDetails/:id" element = {<RecepieDetails/>} />
      </Routes>
      </recepieContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App

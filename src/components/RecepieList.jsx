import { useContext} from "react"
import recepieContext from "../context/RecepieContext.js"
import { Link } from "react-router-dom"


export default function RecepieList(){

    const recepies = useContext(recepieContext)

    return <main className= "bg-rose-50 flex flex-wrap gap-2 ">
       {recepies.map((recepie)=> {
        return <Link to={`/RecepieDetails/${recepie.idMeal}`} className = "relative" key = {recepie.idMeal} >
            <img src= {recepie.strMealThumb} alt = {recepie.strMeal} className="w-[300px] h-[300px] rounded-lg hover:scale-110"  />
            <p className = "absolute italic bottom-0 w-full text-lg font-bold text-white drop-shadow-lg ">{recepie.strMeal}</p>
        </Link>
    })
    }
    </main>    
} 



import { useContext} from "react"
import recepieContext from "../context/RecepieContext.js"
import { Link } from "react-router-dom"


export default function RecepieList(){

    const recepies = useContext(recepieContext)

    return <main className= "bg-[#FFF2CC] min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 content-start gap-4 p-6 sm:p-8 ">
       {recepies.map((recepie)=> {
        return <Link to={`/RecepieDetails/${recepie.idMeal}`} className = "group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E4DBC2] bg-[#FFFDF7] shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A34F36]" key = {recepie.idMeal} >
            <div className="overflow-hidden">
                <img src= {recepie.strMealThumb} alt="" className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
            </div>
            <div className="flex flex-1 items-center gap-3 p-4">
                <h2 className="min-w-0 flex-1 break-words font-serif text-lg font-semibold leading-snug text-[#412C24]">{recepie.strMeal}</h2>
                <span aria-hidden="true" className="shrink-0 text-[#A34F36]">↗</span>
            </div>
        </Link>
    })
    }
    </main>    
} 

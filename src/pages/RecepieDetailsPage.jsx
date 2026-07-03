import { useContext } from "react"
import recepieContext from "../context/RecepieContext.js"
import {useParams} from "react-router-dom"

export default function RecepieDetails(){

    const {id} = useParams()
    const recepies = useContext(recepieContext)

    const ingredients = []
     
     console.log("iduseparam",id)
     console.log("recepies",recepies)

    const filteredRecepie = recepies.find((recepie)=>{
                return recepie.idMeal === id
            })

    for(let i=0;i<=20;i++){
       const ingredient = filteredRecepie[`strIngredient${i}`]
         if(ingredient && ingredient.trim()!=""){
            ingredients.push(ingredient)
         }
    }      

            console.log("filiered recepie",filteredRecepie)

    return <div>
        <header className = "w-fit h-fit bg-emerald-100 text-3xl font-bold flex justify-center  align-center m-auto p-2 rounded-lg">
            {filteredRecepie.strMeal}
        </header>
        <div className="flex justify-center gap-4 mt-8">
            <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-700">
             Edit
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
             Delete
            </button>
        </div>
       
        <section className = "p-4">
            <p className ="bold text-lg text-amber-100 mb-4">Ingredients:</p>
            <ul className= "mb-8">
            {ingredients.map((ingredient,index)=>{
                return <li key = {index} className = "italic text-lg text-emerald-500 gap-2 ml-4">{ingredient}</li>
                
            })
           }
           </ul>
           <p className ="bold text-lg text-amber-100 mb-4">Cooking Instructions:</p>
           <p className= "italic text-lg text-emerald-500 gap-2 ml-4" >{filteredRecepie.strInstructions}</p>       
        </section>
           
    </div>
}
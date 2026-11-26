import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import recepieContext from '../context/RecepieContext.js'
import { answerRecipeQuestion } from '../utils/recipeChat.js'
import './RecipeChat.css'

export default function RecipeChat() {
    const recipes = useContext(recepieContext)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello, home cook! I can list your recipes, suggest an easy option, or help you find a dish. What sounds good?', recipes: [] }])
    const inputRef = useRef(null)
    const launcherRef = useRef(null)
    const logRef = useRef(null)

    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])
    useEffect(() => {
        if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
    }, [messages, open])

    function closeChat() {
        setOpen(false)
        launcherRef.current?.focus()
    }
    function send(text) {
        const question = text.trim()
        if (!question) return
        const answer = answerRecipeQuestion(question, recipes)
        setMessages((previous) => [...previous, { role: 'user', text: question }, { role: 'assistant', ...answer }])
        setInput('')
        inputRef.current?.focus()
    }

    return (
        <aside className="recipe-chat" aria-label="Recipe assistant">
            {open && (
                <section className="recipe-chat__panel" id="recipe-chat-panel" aria-labelledby="recipe-chat-title" onKeyDown={(event) => { if (event.key === 'Escape') closeChat() }}>
                    <header className="recipe-chat__header">
                        <div><h2 id="recipe-chat-title">Your kitchen companion</h2><p>Answers from your recipe collection</p></div>
                        <button type="button" onClick={closeChat} aria-label="Close recipe assistant">×</button>
                    </header>
                    <div className="recipe-chat__log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`recipe-chat__message recipe-chat__message--${message.role}`}>
                                <span className="recipe-chat__speaker">{message.role === 'user' ? 'You' : 'Recipe Book'}</span>
                                <p>{message.text}</p>
                                {!!message.recipes?.length && <ul>{message.recipes.map((recipe) => <li key={recipe.idMeal}><Link to={`/RecepieDetails/${recipe.idMeal}`}>{recipe.strMeal} <span aria-hidden="true">↗</span></Link></li>)}</ul>}
                            </div>
                        ))}
                    </div>
                    <div className="recipe-chat__suggestions">
                        {['List recipes', 'Suggest an easy recipe'].map((prompt) => <button key={prompt} type="button" onClick={() => send(prompt)}>{prompt}</button>)}
                    </div>
                    <form className="recipe-chat__form" onSubmit={(event) => { event.preventDefault(); send(input) }}>
                        <label className="sr-only" htmlFor="recipe-question">Ask about your recipes</label>
                        <input ref={inputRef} id="recipe-question" value={input} onChange={(event) => setInput(event.target.value)} maxLength={300} placeholder="Do you have chicken curry?" autoComplete="off" />
                        <button type="submit" disabled={!input.trim()}>Send</button>
                    </form>
                    <p className="recipe-chat__footnote">Local recipe helper · searches loaded recipes only</p>
                </section>
            )}
            <button ref={launcherRef} type="button" className="recipe-chat__launcher" aria-expanded={open} aria-controls="recipe-chat-panel" onClick={() => open ? closeChat() : setOpen(true)}>
                <span aria-hidden="true">✦</span> {open ? 'Close assistant' : 'Ask Recipe Book'}
            </button>
        </aside>
    )
}

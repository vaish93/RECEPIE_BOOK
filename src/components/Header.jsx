import './Header.css'

export default function Header() {
    return (
        <header className="recipe-header">
            <div className="recipe-header__inner">
                <a className="recipe-header__brand" href="/" aria-label="Recipe Book home">
                    <span className="recipe-header__emblem" aria-hidden="true">
                        <svg viewBox="0 0 32 32" fill="none">
                            <path d="M16 9c-4-3-8-3-12-2v18c4-1 8-1 12 2 4-3 8-3 12-2V7c-4-1-8-1-12 2Z" />
                            <path d="M16 9v18M8 12c2-.3 3.5 0 5 1M8 17c2-.3 3.5 0 5 1M20 13l2 2 3-4" />
                        </svg>
                    </span>
                    <span>
                        <span className="recipe-header__eyebrow">A little inspiration, every day</span>
                        <span className="recipe-header__title">Recipe <em>Book</em><span className="recipe-header__dot">.</span></span>
                    </span>
                </a>

                <div className="recipe-header__note">
                    <span className="recipe-header__note-label">FROM THE KITCHEN, WITH LOVE</span>
                    <p>Happy cooking. <em>Happy eating.</em></p>
                </div>
            </div>
        </header>
    )
}

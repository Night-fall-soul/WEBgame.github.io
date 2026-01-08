class ScoreManager {
    //iker i did the coockies but its the frst time i handle this shit so look through it and tell me what goes well and what goes shit ty 
    // amine can you write your comments in english .... 
    
    #currentScore = 0;

    constructor(domRenderer) {
        this.dom = domRenderer; // Référence à l'élément HTML où afficher le score
        this.#currentScore = 0;
        this.highScore = this._getCookie("highScore") || 0;
    }

    // Ajoute des points et met à jour le cookie si record battu
    addScore(points) {
        this.#currentScore += points;

        if (this.#currentScore > this.highScore) {
            this.highScore = this.#currentScore;
            this._setCookie("highScore", this.highScore, 30); // Garde le record 30 jours
        }

        updateDisplay();
    }

    getScore() {
        return this.#currentScore;
    }

    reset() {
        this.#currentScore = 0;
        this.updateDisplay();
    }

    // Met à jour le texte dans le DOM
    updateDisplay() {
        if (this.dom) {
            this.dom.drawScore(this.#currentScore);
        }
    }

    // --- Gestion des Cookies (Privé) ---

    _setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }

    _getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return parseInt(c.substring(nameEQ.length, c.length));
        }
        return 0;
    }
}

export default ScoreManager;

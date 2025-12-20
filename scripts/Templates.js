export function createMainMenuContainer() {
    return `
        <div class="menu-content">
            <h2>Night Fall Soul</h2>
            
            <div class="input-group">
                <label for="name-field">Nickname</label>
                <input type="text" id="name-field" name="name" placeholder="Sparky sparky" />
            </div>

            <div class="input-group">
                <label for="difficulty">How difficult may your game be:</label>
                <select name="difficulty" id="difficulty">
                    <option value="Facile">ez</option>
                    <option value="Moyen">normal</option>
                    <option value="Difficile">67 difficulty</option>
                </select>
            </div>

            <div class="scores-section">
                <h3>Session ranking:<h3>
                <table aria-label="Classement de session">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nick</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody id="board-body">
                        </tbody>
                </table>
            </div>

            <button id="start-btn">PLAY</button>
        </div>
    `;
}

export function createGameContainer() {
    return `
        <div id="hud-layer">
            <span>Score: <span id="score-value">0</span></span>
        </div>

        <div id="game-area">
            </div>
    `;
}

export function createGameOverContainer() {
    return `
        <div class="menu-content">
            <h2>Game Over</h2>
            <p>i know you hate this game but don't surrend</p>
            
            <div id="final-score-display">
                <h3>final score: <span id="final-score-value">0</span></h3>
            </div>
            
            <button id="restart-btn">Play again</button>
            <button id="menu-btn">Main Menu</button>
        </div>
    `;
}

export function createQuickMenuContainer() {
    return `
        <div class="menu-content pause-menu">
            <h2>Pause</h2>
            <div id="current-score-pause">
                <h3>Score: <span id="pause-score-value">0</span></h3>
            </div>
            <button id="resume-btn">Resume</button>
            <button id="restart-pause-btn">Play again</button>
            <button id="quit-btn">Quit</button>
        </div>
    `;
}

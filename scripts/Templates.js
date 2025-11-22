export function createMainMenuContainer() {
    return `
        <div>
          <label for="name">Nom du joueur:</label>
          <input type="text" id="name-field" name="name" />
        </div>

        <div>
          <select name="name" id="difficulty">
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        <div>
          <!-- Classement -->
          <h3 style="margin: 14px 0 6px; font-size: 16px">
            Classement (session)
          </h3>
          <!-- I wouldn't do a table here, just div summons by DOM... As you want. -->
          <!-- DOM = Document Object Model (pour Amine) -->
          <table aria-label="Classement de session">
            <thead>
              <tr>
                <th>#</th>
                <th>Pseudo</th>
                <th>Score</th>
                <th>Diff.</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="board-body"></tbody>
          </table>
        </div>

        <button id="" class="">JOUER</button>
        <!-- This is NOT a global container, just it's the pause menu.
           Therefore is a popup, therefore has different style than global-container. -->
        <div class="pause" id="pause-menu-container">
          <h2>Partie en jeu</h2>
          <div id="current-score">
            <h3>Current score:</h3>
            <p id=""></p>
          </div>
          <button id="">Continuer avec la partie</button>
          <button id="">Revenir en Menu</button>
          <button id="">Rejouer</button>
        </div>
`;
}

export function createGameOverContainer() {
    return `<p>finally u lost loser</p>`;
}

export function createGameContainer() {
    // todo...
}

export function createQuickMenuContainer() {
    // todo...
}

export default function HomePageContent() {
    return (<div className="container">
        <div className="game-introduction p-4 bg-light border rounded-3">
            <h2 className="fw-bold">Conway’s Game of Life</h2>
            <p>The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.</p>
            <h3 className="mt-3">Rules</h3>
            <ul>
                <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
            </ul>
        </div>
    </div>)
}
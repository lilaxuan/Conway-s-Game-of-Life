import React, { useState, useRef, useEffect, useContext } from 'react';
import BoxComponent from './BoxComponent';
import './GridLayout.css';
import { useCount } from './CountProvider';

const initialGridState = (rows, cols) => {
    // Initialize the grid with objects containing alive status and age
    const grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ alive: false, age: 1 }))
    );

    // Calculate total cells and determine the number of initially alive cells
    const totalCells = rows * cols;
    const initialAliveCells = Math.floor(totalCells * 0.05); // 5% of the grid

    for (let a = 0; a < initialAliveCells; a++) {
        // Select a random cell to be alive
        let i = Math.floor(Math.random() * rows);
        let j = Math.floor(Math.random() * cols);
        grid[i][j] = { alive: true, age: 0 }; // Set alive and reset age to 0

        // Cluster around this cell
        // Determine the number of neighbors to also turn alive
        const neighborsToAlive = Math.floor(Math.random() * 4) + 1; // 1 to 4 neighbors
        for (let n = 0; n < neighborsToAlive; n++) {
            const iOffset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const jOffset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newI = i + iOffset;
            const newJ = j + jOffset;

            // Check bounds and avoid the cell itself
            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols && !(iOffset === 0 && jOffset === 0)) {
                grid[newI][newJ] = { alive: true, age: 0 }; // Set neighboring cells alive and reset age to 0
            }
        }
    }
    return grid;
};



export default function GridLayout() {
    const INITIAL_ROWS = 20;
    const INITIAL_COLS = 20;
    const [rows, setRows] = useState(INITIAL_ROWS);
    const [cols, setCols] = useState(INITIAL_COLS);
    const [inputRows, setInputRows] = useState(INITIAL_ROWS); // save the input values
    const [inputCols, setInputCols] = useState(INITIAL_COLS);
    const [error, setError] = useState('');
    const gridContainerRef = useRef(null); // Ref for accessing the grid container to change the rows and cols for the grid
    const [grid, setGrid] = useState(() => initialGridState(rows, cols));
    const { count, setCount } = useCount();
    const [autoPlay, setAutoPlay] = useState(false);
    const [renderWithHeatmap, setRenderWithHeatmap] = useState(false);


    useEffect(() => {
        const count = countLivingCells(grid);
        setCount(count);
    }, [grid, rows, cols]);

    function countLivingCells(grid) {
        let livingCellsCount = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j]['alive'] === true) {
                    livingCellsCount += 1;
                }
            }
        }
        return livingCellsCount;
    }

    // Reset the Grid dimension based on users' inputs
    function resetGridSize() {
        if (inputRows < 3 || inputRows > 40 || inputCols < 3 || inputCols > 40) {
            setError('Please enter values between 3 and 40 for both width and height.');
            return;
        }
        setError('');
        setRows(inputRows);
        setCols(inputCols);
        const newGrid = initialGridState(inputRows, inputCols);
        setGrid(newGrid);
    };

    // useEffect better not nested in another function 
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        if (gridContainerRef.current) {
            gridContainerRef.current.style.setProperty('--rows', rows);
            gridContainerRef.current.style.setProperty('--cols', cols);

            // dynamically set the box size
            const maxGridHeight = 600; // Adjust as needed
            const maxBoxHeight = Math.floor(maxGridHeight / rows);
            const boxSize = Math.max(Math.min(maxBoxHeight, 20), 5); // Clamp size between 5px and 20px
            gridContainerRef.current.style.setProperty('--box-height', `${boxSize}px`);
            gridContainerRef.current.style.setProperty('--box-width', `${boxSize}px`);
        }
    }, [rows, cols]);

    function buildGrid(grid, rows, cols) {
        console.log('in buildGrid: ');
        console.log('in buildGrid-renderWithHeatMap: ', renderWithHeatmap);
        let newBoxComponents = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                const age = grid[i][j]['age'];
                if (grid[i][j]['alive'] === true) {
                    // Key has to be unique so that the BoxComponent can be re-rendered
                    row.push(<BoxComponent key={`${i}-${j}-${grid[i][j]['alive']}-${age}-${renderWithHeatmap}`} isAlive={true} age={age} renderHeatmap={renderWithHeatmap} />);
                } else {
                    row.push(<BoxComponent key={`${i}-${j}-${grid[i][j]['alive']}-${age}-${renderWithHeatmap}`} isAlive={false} age={age} renderHeatmap={renderWithHeatmap} />);
                }
            }
            newBoxComponents.push(row);
        }
        console.log('in buildGrid-new boxComponents: ', newBoxComponents);
        return newBoxComponents;
    };


    // Reset Grid to the original 20*20 dimension with 5% living cells
    function resetGrid() {
        // // No need to update the boxComponents, since it will re-render the whole page(run the whole scripts), then the boxComponents will be changed again; 
        // just need to updates the rows and cols. So when those data has been changed, the page will be re-rendered again. So the boxComponents will be re-rendered. 
        setRows(INITIAL_ROWS);
        setCols(INITIAL_COLS);
        setInputRows(INITIAL_ROWS);
        setInputCols(INITIAL_COLS);
        setError('');
        const newGrid = initialGridState(INITIAL_ROWS, INITIAL_COLS);
        setGrid(newGrid);
        setAutoPlay(false); // turn off autoPlay if the grid has been re-set.
    }

    function autoPlayGame() {
        setAutoPlay(!autoPlay);
    }

    useEffect(() => {
        let intervalId;

        if (autoPlay === true) {
            console.log('start');
            intervalId = setInterval(runSimulation, 1000); // Run `runSimulation` every 100ms (1 second)
        } else {
            console.log('stoppp!!!');
            if (intervalId) {
                clearInterval(intervalId); // Clear interval if autoPlay is false
            }
        }

        // Cleanup function to clear interval when the component unmounts or autoPlay changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [autoPlay, grid]); // Dependency array includes autoPlay and grid to re-trigger effect when it changes.

    function replaceColorWithHeatMap() {
        setRenderWithHeatmap(!renderWithHeatmap);
    }

    useEffect(() => {
        if (renderWithHeatmap === true) {
            buildGrid(grid, rows, cols);
        }
    }, [renderWithHeatmap]);


    function runSimulation() {
        const newGrid = grid.map((row, i) =>
            row.map((cell, j) => {
                const neighborsAlive = countLivingNeighbors(grid, i, j);
                let newCell = { ...cell }; // Create a copy of the cell object

                // Cell's next state logic
                if (cell.alive) {
                    if (neighborsAlive < 2 || neighborsAlive > 3) {
                        // A living cell dies due to underpopulation or overpopulation
                        newCell.alive = false;
                        newCell.age = 1; // Alive has been changed from true to false; set age to 1
                    } else {
                        // A living cell stays alive
                        newCell.age = 0; // Age is reset to 0 if the cell stays alive
                    }
                } else {
                    if (neighborsAlive === 3) {
                        // A dead cell becomes alive due to reproduction
                        newCell.alive = true;
                        newCell.age = 0; // Alive has been changed from false to true; reset age to 0
                    } else {
                        // A dead cell stays dead
                        newCell.age += 1; // Increase the age by 1 if the cell remains dead
                    }
                }

                return newCell;
            })
        );

        setGrid(newGrid); // Update the grid with the new state
    }


    // check the number of living neighbors cells and dead neighbor cells of a cell (i, j)
    function countLivingNeighbors(grid, i, j) {
        let numOfLivingNeighbors = 0;
        if (grid.length === 0) {
            return 0;
        }
        if (i < 0 || j < 0 || i > grid.length - 1 || j > grid[0].length - 1) {
            return 0;
        }
        // up
        if (i - 1 >= 0) {
            if (grid[i - 1][j]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // down
        if (i + 1 < grid.length) {
            if (grid[i + 1][j]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // left
        if (j - 1 >= 0) {
            if (grid[i][j - 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right
        if (j + 1 < grid[0].length) {
            if (grid[i][j + 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // left, up
        if (i - 1 >= 0 && j - 1 >= 0) {
            if (grid[i - 1][j - 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // left, down
        if (i + 1 < grid.length && j - 1 >= 0) {
            if (grid[i + 1][j - 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right, up
        if (i - 1 >= 0 && j + 1 < grid[0].length) {
            if (grid[i - 1][j + 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right, down
        if (i + 1 < grid.length && j + 1 < grid[i].length) {
            if (grid[i + 1][j + 1]['alive'] === true) {
                numOfLivingNeighbors += 1;
            }
        }
        return numOfLivingNeighbors;
    }


    return (
        <div>
            <div className='form-container my-4'>
                <p>Reset the grid width and height</p>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Width"
                    onChange={(e) => setInputCols(parseInt(e.target.value) || 0)}
                    value={inputCols} />
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Height"
                    onChange={(e) => setInputRows(parseInt(e.target.value) || 0)}
                    value={inputRows} />

                <button id='grid-button' onClick={resetGridSize} className="btn btn-primary">Submit</button>
                {error && <div className="alert alert-danger mt-3 red">{error}</div>}
            </div>

            <div className='content-container'>
                <div className='content-left'>
                    <div>Current Living Cells: {count}</div>
                    <div className='grid-background'>
                        <div className="grid-container" ref={gridContainerRef}>
                            {buildGrid(grid, rows, cols)}
                        </div>
                    </div>
                </div>

                <div className='content-right'>
                    <button id='grid-button' onClick={resetGrid} className="btn btn-primary">Reset</button>
                    <button id='grid-button' onClick={runSimulation} className="btn btn-primary">Next Frame</button>
                    <button id='grid-button' onClick={autoPlayGame} className="btn btn-primary">AutoPlay</button>
                    <button id='grid-button' onClick={replaceColorWithHeatMap} className="btn btn-primary">Replace With A HeatMap</button>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useRef, useEffect, useContext } from 'react';
import BoxComponent from './BoxComponent';
import './GridLayout.css';
import { CountContext } from './CountProvider';


const initialGridState = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            if (Math.random() < 0.05) {
                row.push(true);
            } else {
                row.push(false);
            }
        }
        grid.push(row);
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
    // console.log('hihihihihihihihi1111111111');
    const [grid, setGrid] = useState(() => initialGridState(rows, cols));
    const [count, setCount] = useState(0);


    useEffect(() => {
        // Count living cells whenever the grid changes
        const count = countLivingCells(grid); // Use one of the countLivingCells function implementations above
        setCount(count);
    }, [grid, rows, cols]);

    function countLivingCells(grid) {
        let livingCellsCount = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === true) {
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
        // console.log('hihihi');
        // const boxComponents = buildGrid();
        // console.log('hihihi2');
        // console.log(boxComponents);
        // console.log(boxComponents[1]);
        // console.log(boxComponents[1][2]);
        // boxComponents[1][2]
        // for (let i = 0; i < boxComponents.length; i++) {
        //     for (let j = 0; j < boxComponents[0].length; j++) {
        //         console.log(hihihi)
        //         console.log(boxComponents[i][j]);
        //     }
        // }
    };

    // useEffect better not nested in another function 
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        if (gridContainerRef.current) {
            gridContainerRef.current.style.setProperty('--rows', rows);
            gridContainerRef.current.style.setProperty('--cols', cols);
        }
    }, [rows, cols]);


    function buildGrid(grid) {
        let boxComponents = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === true) {
                    row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} x={i} y={j} />);
                } else {
                    row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} x={i} y={j} />);

                }
            }
            boxComponents.push(row);
        }
        return boxComponents;
    };


    // Reset Grid to the original 20*20 dimension with 5% living cells
    function resetGrid() {
        // // No need to update the boxComponents, since it will re-render the whole page(run the whole scripts), then the boxComponents will be changed again; 
        // just need to updates the rows and cols. So when those data has been changed, the page will be re-rendered again. So the boxComponents will be re-rendered. 
        setRows(INITIAL_ROWS);
        setCols(INITIAL_COLS);
    }

    // updates the boxComponents grid based on the rules
    function runSimulation(boxComponents, chosenIndices) {
        console.log('hihihi-run simulation456!!!');
        console.log('run-simulation-boxComponents: ', boxComponents);
        // 基于当前chosenIndices计算下一步的chosenIndices
        const newChosenIndices = chosenIndices; // 举例，实际上你需要根据游戏规则来计算
        for (let i = 0; i < boxComponents.length; i++) {
            for (let j = 0; j < boxComponents[i].length; j++) {
                let numOfLivingNeighbors = countLivingAndDeadNeighbors(boxComponents, i, j)
                console.log('num of living neighbors for current pos i-j-numoflivingneighbor', i, j, numOfLivingNeighbors);
                //1. A dead cell with exactly three live neighbours becomes a live cell,
                if (boxComponents[i][j].isAlive === false) {
                    if (numOfLivingNeighbors === 3) {
                        // Components的state和props没办法改变，除非通过useState
                        // boxComponents[i][j].isAlive = ture;
                        // <BoxComponent
                        //     key={`${i}-${j}`}
                        //     isAlive={true}
                        // />
                        newChosenIndices.add([i, j]);
                    }
                }
                else {
                    // 2. A living cell with less than two living neighbours dies.
                    if (numOfLivingNeighbors < 2) {
                        // boxComponents[i][j].isAlive = false;
                        // newChosenIndices.delete([i, j]);
                        deleteArrayFromSet(newChosenIndices, [i, j]);

                    } else if (numOfLivingNeighbors === 2 || numOfLivingNeighbors === 3) {
                        // 3. A living cell with two or three live neighbours lives
                        // continue;
                        newChosenIndices.add([i, j]);
                    } else if (numOfLivingNeighbors > 3) {
                        // 4. A living cell with more than three live neighbours dies.
                        // boxComponents[i][j].isAlive = false;
                        // newChosenIndices.delete([i, j]);
                        deleteArrayFromSet(newChosenIndices, [i, j]);
                    }
                }

            }
        }
    }

    // check the number of living neighbors cells and dead neighbor cells of a cell (i, j)
    function countLivingAndDeadNeighbors(boxComponents, i, j) {
        let numOfLivingNeighbors = 0; // 3 living neighbors 
        // up
        if (i - 1 >= 0) {
            if (boxComponents[i - 1][j].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }

        // down
        if (i + 1 < boxComponents.length) {
            if (boxComponents[i + 1][j].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }

        // left
        if (j - 1 >= 0) {
            if (boxComponents[i][j - 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right
        if (j + 1 < boxComponents[i].length) {
            if (boxComponents[i][j + 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // left, up
        if (i - 1 >= 0 && j - 1 >= 0) {
            if (boxComponents[i - 1][j - 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // left, down
        if (i + 1 < boxComponents.length && j - 1 >= 0) {
            if (boxComponents[i + 1][j - 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right, up
        if (i - 1 >= 0 && j + 1 < boxComponents[i].length) {
            if (boxComponents[i - 1][j + 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        // right, down
        if (i + 1 < boxComponents.length && j + 1 < boxComponents[i].length) {
            if (boxComponents[i + 1][j + 1].isAlive === true) {
                numOfLivingNeighbors += 1;
            }
        }
        return numOfLivingNeighbors;
    }

    // const boxComponents = buildGrid(chosenIndices, rows, cols);
    const boxComponents = buildGrid(grid);


    return (
        <CountContext.Provider value={{ count, setCount }}>
            {/* <CountContext.Provider value={{ good_count, setGoodCount }}> */}
            <div className='content'>
                {/* <div className='part'> */}
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

                    <button onClick={resetGridSize} className="btn btn-primary">Submit</button>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
                <div>Current Living Cells: {count}</div>
                <div className='grid-background'>
                    <div className="grid-container" ref={gridContainerRef}>
                        {boxComponents}
                    </div>
                </div>
                {/* <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 20px)` }}>
                    {grid.map((row, rowIndex) =>
                        row.map((isAlive, colIndex) => (
                            <BoxComponent
                                key={`${rowIndex}-${colIndex}`}
                                isAlive={isAlive}
                                toggleCellState={() => toggleCellState(rowIndex, colIndex)}
                            />
                        ))
                    )}
                </div> */}
                <div className='form-container form-control-bottom'>
                    <button onClick={resetGrid} className="btn btn-primary">Reset</button>
                    <button onClick={resetGrid} className="btn btn-primary">Run Simulation</button>
                </div>
            </div>
        </CountContext.Provider>
    )
}



// Function to check if an array contains a pair [i, j]
// function containsArray(arrOfArr, targetArr) {
//     return arrOfArr.some(subArr =>
//         subArr.length === targetArr.length && subArr.every((value, index) => value === targetArr[index])
//     );
// }
// const exists = array.includes(item);
// const exists = mySet.has(item); // only the same object will return true



// genRandomIndicesForAliveBoxes(rows, cols);
// Generate random incides for living cells for the initial Grid
// function genRandomIndicesForAliveBoxes(rows, cols) {
//     const chosenIndices = new Set();
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             // Generate a random number between 0 and 1
//             const rand = Math.random();
//             if (rand < 0.05) {
//                 // chosenIndices.push([i, j]);
//                 chosenIndices.add([i, j]);
//             }
//         }
//     }
//     // console.log('chosen indices to be alive are: ', chosenIndices);
//     return chosenIndices;
//     // setChosenIndices(chosenIndices);
// }

// Choose random 5% cells to be alive; Pass the background color props to the child BoxComponent
// function buildGrid(chosenIndices, rows, cols) {
//     let boxComponents = [];
//     console.log('in buildGrid-chosenIndices: ', chosenIndices);
//     for (let i = 0; i < rows; i++) {
//         let row = [];
//         for (let j = 0; j < cols; j++) {
//             // if (containsArray(chosenIndices, [i, j])) {
//             if (setHasArray(chosenIndices, [i, j]) === true) {
//                 row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} x={i} y={j} />);
//                 // if (adjustBoxSize === true) {
//                 //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} adjustBoxSize={true} />); // can pass x and y;
//                 // } else {
//                 //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} adjustBoxSize={false} />);
//                 // }
//             } else {
//                 row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} x={i} y={j} />);
//                 // if (adjustBoxSize === true) {
//                 //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} adjustBoxSize={true} />);
//                 // } else {
//                 //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} adjustBoxSize={false} />);
//                 // }
//             }
//             // row.push(<BoxComponent key={`${i}-${j}`} />);
//         }
//         boxComponents.push(row);
//     }

//     // console.log('1111111111-boxComponents: ', boxComponents);
//     // console.log('in build initial grid-boxComponents: ', boxComponents);
//     return boxComponents;
// };


// function setHasArray(set, arrayToFind) {
//     for (const item of set) {
//         if (Array.isArray(item) && arrayToFind.length === item.length && arrayToFind.every((val, index) => val === item[index])) {
//             return true;
//         }
//     }
//     return false;
// }

// // Function to delete an array from the set based on its elements
// function deleteArrayFromSet(set, arrayToDelete) {
//     for (let item of set) {
//         if (Array.isArray(item) && item.length === arrayToDelete.length && item.every((value, index) => value === arrayToDelete[index])) {
//             set.delete(item);
//             return true; // Return true if an array was found and deleted
//         }
//     }
//     return false; // Return false if the array was not found
// }
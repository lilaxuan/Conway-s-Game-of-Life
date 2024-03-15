import React, { useState, useRef, useEffect } from 'react';
import BoxComponent from './BoxComponent';
import './GridLayout.css';
import { CountContext } from './CountProvider';
// import { CountContext, CountProvider, useCount} from './CountProvider';


export default function GridLayout() {
    const INITIAL_ROWS = 20;
    const INITIAL_COLS = 20;
    const [rows, setRows] = useState(INITIAL_ROWS);
    const [cols, setCols] = useState(INITIAL_COLS);
    const [inputRows, setInputRows] = useState(INITIAL_ROWS); // save the input values
    const [inputCols, setInputCols] = useState(INITIAL_COLS);
    const [error, setError] = useState('');
    const gridContainerRef = useRef(null); // Ref for accessing the grid container to change the rows and cols for the grid
    // const initialBoxComponents = buildInitialGrid(chosenIndices, rows, cols);
    // const [boxComponents, setBoxComponents] = useState([initialBoxComponents]); // no need to set up boxComponents using state, otherwise it'll be rendered a lot of times. 
    // const [boxComponents, setBoxComponents] = useState([]);
    console.log('hihihi123');
    // const [count, setCount] = useState(0);
    // const { count } = useCount();
    // const chosenIndices = genRandomIndicesForAliveBoxes(rows, cols);
    // let count = 0; // we don't want re-render every time count changes; otherwise it'll get into a inifinite loop
    console.log('hihihihihihihihi1111111111');
    console.log('hihihihihihihihi1111111111');
    const [chosenIndices, setChosenIndices] = useState(genRandomIndicesForAliveBoxes(INITIAL_ROWS, INITIAL_COLS));
    // const [initialCount, setInitialCount] = useState(chosenIndices.size);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setChosenIndices(genRandomIndicesForAliveBoxes(rows, cols));
    }, [rows, cols]);

    // useEffect(() => {
    //     setInitialCount(chosenIndices.size); // Update initial count based on chosenIndices
    // }, chosenIndices); // Recalculate when rows or cols change

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

    // Generate random incides for living cells for the initial Grid
    function genRandomIndicesForAliveBoxes(rows, cols) {
        const chosenIndices = new Set();
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Generate a random number between 0 and 1
                const rand = Math.random();
                if (rand < 0.05) {
                    // chosenIndices.push([i, j]);
                    chosenIndices.add([i, j]);

                }
            }
        }
        // console.log('chosen indices to be alive are: ', chosenIndices);
        return chosenIndices;
    }

    // Choose random 5% cells to be alive; Pass the background color props to the child BoxComponent
    function buildGrid(chosenIndices, rows, cols) {
        // Create the initial 20 * 20 boxComponents/grids
        // let adjustBoxSize = false;
        // if (rows > 22) {
        //     adjustBoxSize = true;
        // }
        let boxComponents = [];
        console.log('in buildGrid-chosenIndices: ', chosenIndices);
        // console.log('1111111111111-rows: ', rows);
        // console.log('1111111111111-cols: ', cols);
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                // if (containsArray(chosenIndices, [i, j])) {
                if (setHasArray(chosenIndices, [i, j]) === true) {
                    row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} />);
                    // if (adjustBoxSize === true) {
                    //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} adjustBoxSize={true} />); // can pass x and y; 
                    // } else {
                    //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={true} adjustBoxSize={false} />);
                    // }
                } else {
                    row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} />);
                    // if (adjustBoxSize === true) {
                    //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} adjustBoxSize={true} />);
                    // } else {
                    //     row.push(<BoxComponent key={`${i}-${j}`} isAlive={false} adjustBoxSize={false} />);
                    // }
                }
                // row.push(<BoxComponent key={`${i}-${j}`} />);
            }
            boxComponents.push(row);
        }

        // console.log('1111111111-boxComponents: ', boxComponents);
        // console.log('in build initial grid-boxComponents: ', boxComponents);
        return boxComponents;
    };

    // Function to check if an array contains a pair [i, j]
    // function containsArray(arrOfArr, targetArr) {
    //     return arrOfArr.some(subArr =>
    //         subArr.length === targetArr.length && subArr.every((value, index) => value === targetArr[index])
    //     );
    // }
    // const exists = array.includes(item);
    // const exists = mySet.has(item); // only the same object will return true

    function setHasArray(set, arrayToFind) {
        for (const item of set) {
            if (Array.isArray(item) && arrayToFind.length === item.length && arrayToFind.every((val, index) => val === item[index])) {
                return true;
            }
        }
        return false;
    }

    // Reset Grid to the original 20*20 dimension with 5% living cells
    function resetGrid() {
        // // No need to update the boxComponents, since it will re-render the whole page(run the whole scripts), then the boxComponents will be changed again; 
        // just need to updates the rows and cols. So when those data has been changed, the page will be re-rendered again. So the boxComponents will be re-rendered. 
        setRows(INITIAL_ROWS);
        setCols(INITIAL_COLS);
    }

    // updates the boxComponents grid based on the rules
    function performRules(boxComponents) {
        for (let i = 0; i < boxComponents.length; i++) {
            for (let j = 0; j < boxComponents[i].length; j++) {
                if (boxComponents[i][j].isAlive === true) {

                }

                if (i == 4 && j == 5) {
                    boxComponents[i][j].isAlive = false;
                }
            }
        }
    }

    // console.log('hihihi-jiaxuanli');
    // const chosenIndices = genRandomIndicesForAliveBoxes(rows, cols);
    // const initial_count = chosenIndices.size;

    // console.log('chosenIndices 111111: ', chosenIndices);
    // console.log('initial_count 1111111: ', initial_count);
    // let boxComponentsLatest = buildGrid(chosenIndices, rows, cols);
    // setBoxComponents(boxComponentsLatest);
    const boxComponents = buildGrid(chosenIndices, rows, cols);

    return (
        // <CountContext.Provider value={{ count, setCount }}>
        // <CountProvider initialCount={initialCount}>
        <CountContext.Provider value={{ count, setCount }}>
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
                {/* </div> */}
                {/* <div className='part2'> */}
                {/* <div grid-count-heatmap-container> */}
                <div>Current Living Cells: {count}</div>
                <div className='grid-background'>
                    <div className="grid-container" ref={gridContainerRef}>
                        {boxComponents}
                    </div>
                </div>
                {/* </div> */}
                {/* </div> */}
                {/* <div className='part'> */}
                <div className='form-container form-control-bottom'>
                    <button onClick={resetGrid} className="btn btn-primary">Reset</button>
                    <button onClick={resetGrid} className="btn btn-primary">Run Simulation</button>
                </div>
                {/* </div> */}
            </div>
            {/* </CountProvider> */}
        </CountContext.Provider>
    )
}
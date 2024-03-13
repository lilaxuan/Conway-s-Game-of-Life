import React, { useState, useRef, useEffect } from 'react';
import BoxComponent from './BoxComponent';
import './GridLayout.css';


export default function GridLayout() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(20);
    const [inputRows, setInputRows] = useState(20); // save the input values
    const [inputCols, setInputCols] = useState(20);
    const [error, setError] = useState('');
    const gridContainerRef = useRef(null); // Ref for accessing the grid container to change the rows and cols for the grid
    // const chosenIndices = genRandomIndicesForAliveBoxes(rows, cols);
    // const initialBoxComponents = buildInitialGrid(chosenIndices);
    // const [boxComponents, setBoxComponents] = useState(initialBoxComponents);

    function buildEmptyGrid() {
        let boxComponents = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(<BoxComponent key={`${i}-${j}`} />);
            }
            boxComponents.push(row);
        }
        return boxComponents;
    };

    function resetGrid() {
        if (inputRows < 3 || inputRows > 40 || inputCols < 3 || inputCols > 40) {
            setError('Please enter values between 3 and 40 for both width and height.');
            return;
        }
        setError('');
        setRows(inputRows);
        setCols(inputCols);
        console.log('hihihi');
        const boxComponents = buildGrid();
        console.log('hihihi2');
        console.log(boxComponents);
        console.log(boxComponents[1]);
        console.log(boxComponents[1][2]);
        boxComponents[1][2]
        for (let i = 0; i < boxComponents.length; i++) {
            for (let j = 0; j < boxComponents[0].length; j++) {
                console.log(hihihi)
                console.log(boxComponents[i][j]);
            }
        }
    };

    // useEffect better not nested in another function 
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        if (gridContainerRef.current) {
            gridContainerRef.current.style.setProperty('--rows', rows);
            gridContainerRef.current.style.setProperty('--cols', cols);
        }
    }, [rows, cols]);

    function genRandomIndicesForAliveBoxes(rows, cols) {
        const chosenIndices = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Generate a random number between 0 and 1
                const rand = Math.random();
                if (rand < 0.05) {
                    chosenIndices.push([i, j]);
                }
            }
        }
        console.log('chosen indices to be alive are: ', chosenIndices);
        return chosenIndices;
    }

    // Choose random 5% cells to be alive; Pass the background color props to the child BoxComponent
    function buildInitialGrid() {
        // Create the initial 20 * 20 boxComponents/grids
        let boxComponents = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(<BoxComponent key={`${i}-${j}`} />);
            }
            boxComponents.push(row);
        }

        // let boxComponents = [];
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < cols; j++) {
        //         boxComponents.push(<BoxComponent key={`${i}-${j}`} />);
        //     }
        // }

        // Set random 5% cells to be alive(Black)
        // const isAlive = true;
        // for (let [i, j] in chosenIndices) {
        //     <BoxComponent key={`${i}-${j}`} alive={isAlive} />
        // }

        return boxComponents;
    };


    let boxComponents = buildEmptyGrid();
    // let boxComponents = buildInitialGrid();
    return (
        <div className='content'>
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

                <button onClick={resetGrid} className="btn btn-primary">Submit</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
            <div className='grid-background'>
                <div className="grid-container" ref={gridContainerRef}>
                    {boxComponents}
                </div>
            </div>
        </div>
    )
}
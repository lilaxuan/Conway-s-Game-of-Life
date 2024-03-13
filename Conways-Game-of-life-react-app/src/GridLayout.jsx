import React, { useState, useRef, useEffect } from 'react';
import BoxComponent from './BoxComponent';
import './GridLayout.css';

export default function GridLayout() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(20);
    const [inputRows, setInputRows] = useState(20); // save the input values
    const [inputCols, setInputCols] = useState(20);
    const [error, setError] = useState('');
    const gridContainerRef = useRef(null); // Ref for accessing the grid container

    function buildGrid() {
        const boxComponents = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                boxComponents.push(<BoxComponent key={`${i}-${j}`} />);
            }
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
        // updateGridDimension(rows, cols);
    };

    // useEffect better not nested in another function 
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        if (gridContainerRef.current) {
            gridContainerRef.current.style.setProperty('--rows', rows);
            gridContainerRef.current.style.setProperty('--cols', cols);
        }
    }, [rows, cols]);

    const boxComponents = buildGrid();

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
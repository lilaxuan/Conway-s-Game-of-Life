import './BoxComponent.css'
import { useState, useEffect } from 'react'


export default function BoxComponent() {
    const [boxLiving, setBoxLiving] = useState(false);
    const [boxColorClass, setBoxColorClass] = useState('deadWhiteColor');

    function swithBoxState() {
        if (boxLiving === true) {
            setBoxLiving(false)
        } else {
            setBoxLiving(true)
        }
    }

    // useEffect updates wheneven the boxLiving state has been changed
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        if (boxLiving === true) {
            setBoxColorClass('livingBlackColor');
        } else {
            setBoxColorClass('deadWhiteColor');
        }
    }, [boxLiving]);

    return (
        <div>
            {/* <p>{props.isAlive}</p> */}
            <button className={`box ${boxColorClass}`} onClick={swithBoxState}></button>
            {/* <div>{props.isAlive}</div> */}
        </div>

    )
}
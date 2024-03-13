import './BoxComponent.css'
import { useState, useEffect } from 'react'


export default function BoxComponent(props) {
    // console.log("helohihi : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
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
            <button className={`box ${boxColorClass}`} onClick={swithBoxState}></button>
        </div>

    )
}
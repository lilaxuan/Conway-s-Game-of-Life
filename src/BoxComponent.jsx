import './BoxComponent.css'
import { useState, useEffect } from 'react'
import { CountProvider } from './CountProvider';


export default function BoxComponent(props) {
    console.log("helohihiisAlive : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
    const [boxColorClass, setBoxColorClass] = useState('deadWhiteColor');
    const { count, setCount } = CountProvider();

    function swithBoxState() {
        setBoxLiving(!boxLiving);
    }


    // // useEffect updates wheneven the boxLiving state has been changed
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
        // console.log('in box components11: count', count);
        if (boxLiving === true) {
            setBoxColorClass('livingBlackColor');
            setCount(count + 1);
        } else {
            setBoxColorClass('deadWhiteColor');
            setCount(count - 1);
        }
    }, [boxLiving]);

    return (
        <div>
            <button className={`box ${boxColorClass}`} onClick={swithBoxState}></button>
        </div>
    )
}
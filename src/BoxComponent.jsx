import './BoxComponent.css'
import { useState, useEffect, useRef } from 'react'
import { CountProvider } from './CountProvider';
import { useCount } from './CountProvider';


export default function BoxComponent(props) {
    console.log("helohihiisAlive : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
    // const [boxColorClass, setBoxColorClass] = useState('deadWhiteColor');
    const [boxColorClass, setBoxColorClass] = useState(props.isAlive ? 'livingBlackColor' : 'deadWhiteColor');
    // const { count, setCount } = CountProvider();
    const { count, setCount } = useCount();
    const prevBoxLiving = useRef();

    useEffect(() => {
        // Set the previous box living state after each render.
        prevBoxLiving.current = boxLiving;
    });


    function swithBoxState() {
        if (boxLiving === true) {
            setBoxLiving(!boxLiving);
            setBoxColorClass('deadWhiteColor');
            setCount(count - 1);
        } else {
            setBoxLiving(!boxLiving);
            setCount(count + 1);
            setBoxColorClass('livingBlackColor');
        }

    }


    // // useEffect updates wheneven the boxLiving state has been changed
    // useEffect(() => {
    //     // Update the grid container's CSS variables when rows or cols changes
    //     // console.log('in box components11: count', count);
    //     if (boxLiving === true) {
    //         setBoxColorClass('livingBlackColor');
    //         setCount(count + 1);
    //     } else {
    //         setBoxColorClass('deadWhiteColor');
    //         setCount(count - 1);
    //     }
    // }, [boxLiving]);

    useEffect(() => {
        // Compare the current boxLiving state to its previous state
        if (boxLiving !== prevBoxLiving.current) {
            // Your logic here will now be aware of the previous state
            console.log(`boxLiving changed from ${prevBoxLiving.current} to ${boxLiving}`);

            if (boxLiving === true) {
                setBoxColorClass('livingBlackColor');
                setCount(count + 1);
            } else {
                setBoxColorClass('deadWhiteColor');
                setCount(count - 1);
            }
        }
    }, [boxLiving]); // add dependencies as needed

    return (
        <div>
            <button className={`box ${boxColorClass}`} onClick={swithBoxState}></button>
        </div>
    )
}
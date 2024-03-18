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
    const [age, setAge] = useState(props.age);
    const [colorClass, setColorClass] = useState(boxColorClass);

    useEffect(() => {
        // Set the previous box living state after each render.
        prevBoxLiving.current = boxLiving;
    });


    function swithBoxState() {
        if (boxLiving === true) {
            setBoxLiving(!boxLiving);
            setBoxColorClass('deadWhiteColor');
            setColorClass('deadWhiteColor')
            setCount(count - 1);
            setAge(age + 1);
        } else {
            setBoxLiving(!boxLiving);
            setCount(count + 1);
            setBoxColorClass('livingBlackColor');
            setColorClass('livingBlackColor')
            setAge(0); // back  to living cell
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
                setAge(0);
            } else {
                setBoxColorClass('deadWhiteColor');
                setCount(count - 1);
                setAge(1);
            }
        }
    }, [boxLiving]); // add dependencies as needed


    // function getColorForAge(age) {
    //     const maxAge = 10;
    //     const aliveColor = { r: 0, g: 255, b: 0 }; // Green
    //     const deadColor = { r: 225, g: 0, b: 0 }; // Red

    //     const clampAge = Math.min(age, maxAge);
    //     const blend = clampAge / maxAge;

    //     const r = Math.round(deadColor.r * blend + aliveColor.r * (1 - blend));
    //     const g = Math.round(deadColor.g * blend + aliveColor.g * (1 - blend));
    //     const b = Math.round(deadColor.b * blend + aliveColor.b * (1 - blend));
    //     return `rgb(${r},${g},${b})`;
    // }

    // function getClassForAge(age) {
    //     const maxAge = 10;
    //     // Map the age directly to a class name, capping at "maxAge"
    //     if (age >= maxAge) return 'cell-age-max';
    //     return `cell-age-${age}`;
    // }

    function getColorClassForAge(age) {
        if (age >= 10) return 'age-10';
        return `age-${age}`;
    }


    const colorBasedOnAge = getColorClassForAge(props.age);
    const renderHeatmap = props.renderHeatmap;

    useEffect(() => {
        if (renderHeatmap === true) {
            setColorClass(colorBasedOnAge);
        } else {
            setColorClass(boxColorClass);
        }
    }, [renderHeatmap]);


    return (
        <div>
            <button className={`box ${colorClass}`} onClick={swithBoxState}></button>
        </div>
    )
}
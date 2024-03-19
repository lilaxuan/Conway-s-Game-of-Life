import './BoxComponent.css'
import { useState, useEffect, useRef } from 'react'
import { useCount } from './CountProvider';


export default function BoxComponent(props) {
    console.log("helohihiisAlive : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
    const [boxColorClass, setBoxColorClass] = useState(props.isAlive ? 'livingBlackColor' : 'deadWhiteColor');
    const { count, setCount } = useCount();
    const prevBoxLiving = useRef();
    const [age, setAge] = useState(props.age);
    const [colorClass, setColorClass] = useState(boxColorClass);

    useEffect(() => {
        // Set the previous box living state after each render.
        prevBoxLiving.current = boxLiving;
    });


    function swithBoxState() {
        let colorClass;
        if (boxLiving === true) {
            setBoxLiving(!boxLiving);
            setCount(count - 1);
            setAge(age + 1);
            if (renderHeatmap === true) {
                colorClass = getColorClassForAge(props.age);
            } else {
                colorClass -= 'deadWhiteColor'
                setBoxColorClass('deadWhiteColor');
            }
        } else {
            setBoxLiving(!boxLiving);
            setCount(count + 1);
            setAge(0); // back  to living cell
            if (renderHeatmap === true) {
                colorClass = getColorClassForAge(props.age);
            } else {
                colorClass -= 'livingBlackColor'
                setBoxColorClass('livingBlackColor');
            }
        }
        setColorClass(colorClass);

    }


    useEffect(() => {
        // Compare the current boxLiving state to its previous state
        if (boxLiving !== prevBoxLiving.current) {
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
    }, [boxLiving]);

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
    }, [renderHeatmap, age]);


    return (
        <div>
            <button className={`box ${colorClass}`} onClick={swithBoxState}></button>
        </div>
    )
}
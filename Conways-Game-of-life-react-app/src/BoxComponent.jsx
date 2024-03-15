import './BoxComponent.css'
import { useState, useEffect } from 'react'
import { CountProvider } from './CountProvider';


export default function BoxComponent(props) {
    // console.log("helohihiisAlive : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
    const [boxColorClass, setBoxColorClass] = useState('deadWhiteColor');
    // const { count, initialCount, setCount } = useCount(); // 可以接受provider中的variables
    const { count, setCount } = CountProvider();


    function swithBoxState() {
        // 需要换一下if 条件不然的话会一直进来这个render里面
        // if (boxLiving === true) {
        //     setBoxLiving(false);
        //     setCount(count - 1);
        // } else {
        //     setBoxLiving(true);
        //     setCount(count + 1);
        // }
        setBoxLiving(!boxLiving);
    }


    // // useEffect updates wheneven the boxLiving state has been changed
    useEffect(() => {
        // Update the grid container's CSS variables when rows or cols changes
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
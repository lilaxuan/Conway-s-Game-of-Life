import './BoxComponent.css'
import { useState, useEffect, useContext } from 'react'
import { CountProvider, CountContext } from './CountProvider';


export default function BoxComponent(props) {
    console.log("helohihiisAlive : ", props.isAlive);
    const [boxLiving, setBoxLiving] = useState(props.isAlive);
    const [boxColorClass, setBoxColorClass] = useState('deadWhiteColor');
    // const { count, initialCount, setCount } = useCount(); // 可以接受provider中的variables
    const { count, setCount } = CountProvider();
    // const { count, setCount, updateInitialCount } = CountProvider();
    // console.log('in Boxcomponents count11: ', count)
    // const { good_count, setGoodCount } = useContext(CountContext); // Use the context

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
            // updateInitialCount(count + 1);
            // setGoodCount(good_count + 1);
        } else {
            setBoxColorClass('deadWhiteColor');
            setCount(count - 1);
            // updateInitialCount(count - 1);
            // setGoodCount(good_count - 1);
        }
    }, [boxLiving]);

    return (
        <div>
            <button className={`box ${boxColorClass}`} onClick={swithBoxState}></button>
        </div>

    )
}
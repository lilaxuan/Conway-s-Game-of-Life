import BoxComponent from './BoxComponent'
import './GridLayoutStyle.css'

export default function GridLayout() {

    return (
        <div>
            <div className="grid-container">
                <BoxComponent />
                <BoxComponent />
                <BoxComponent />
                <BoxComponent />
            </div>
        </div>
    )
}
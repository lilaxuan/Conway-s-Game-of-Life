import './Home.css'
import { Link, Routes, Route } from 'react-router-dom';
import Personal from './Personal';
import GridLayout from './GridLayout';

export default function Home() {

    return (
        <div>
            <header className="header">
                <Link to="/">Home</Link>
                <Link to="/grid">Game</Link>
                <Link to="/jiaxuanli">Personal</Link>
            </header>

            {/* Route Definitions */}
            <Routes>
                <Route path="/grid" element={<GridLayout />} />
                <Route path="/jiaxuanli" element={<Personal />} />
            </Routes>
            <body>

            </body>
        </div>
    )
}
import './Home.css'
import { Link, Routes, Route } from 'react-router-dom';
import Personal from './Personal';
import GridLayout from './GridLayout';
import HomePageContent from './HomePageContent';
import { CountProvider } from './CountProvider';

export default function Home() {

    return (
        <div>
            <header className="header">
                <Link to="/" className="link-no-decoration">Home</Link>
                <Link to="/grid" className="link-no-decoration">Game</Link>
                <Link to="/jiaxuanli" className="link-no-decoration">Personal</Link>
            </header>

            {/* Route Definitions */}
            <Routes>
                <Route path="/" element={<HomePageContent />} /> {/* Has to seperate out the content instead of using Home component itself, otherwise the page will be rendered recursively */}
                <Route path="/grid" element={<CountProvider><GridLayout /></CountProvider>} />
                <Route path="/jiaxuanli" element={<Personal />} />
            </Routes>
        </div>
    )
}
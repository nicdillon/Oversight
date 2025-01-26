import { useState, useEffect } from 'react';
import oversightLogo from '../assets/OversightLogo.png';
import invertedLogo from '../assets/NexLogoInverted.png';
import Card from '../components/Card.jsx';
import './Home.css';
import useLocalStorage from 'use-local-storage';

const API_ROOT = import.meta.env.VITE_STEAM_WEBAPP_API_ROOT;
let steamAPIUrl = `${API_ROOT}/SteamAPI`;

function Home() {
    const [fetchError, setFetchError] = useState(null);
    const [gamesAreLoading, setGamesAreLoading] = useState(false);
    const [games, setGames] = useState([]);
    useEffect(() => {
        handleGetSteamApps();
    }, []);
    const [darkMode] = useLocalStorage('darkMode');

    async function handleGetSteamApps() {
        try {
            setGamesAreLoading(true);
            const response = await fetch(steamAPIUrl);
            const data = await response.json();

            console.log(data)

            const games = data.map(appJson => ({
                id: appJson.appid,
                name: appJson.name
            }));

            setGames(games);
            setGamesAreLoading(false);
        } catch (error) {
            setFetchError(error);
            console.error(error);
            setGamesAreLoading(false); // Ensure loading state is updated even if there is an error
        }
    }

    return (
        <div className='home-container'>
            <div className="logo-container">
                <img src={darkMode == "dark" ? invertedLogo : oversightLogo} className="logo" alt="Oversight Logo" />
            </div>
            <div className="content">
                <h1>Welcome to NEX</h1>
                {gamesAreLoading && !fetchError && <i className='fa-circle-o-notch fa-spin' />}
                {fetchError && <p>{fetchError}</p>}
                <div className="card">
                    {!gamesAreLoading && games !== undefined && games.length > 0 && games.map(game => (
                        <Card className='card' key={game.id} id={game.id} name={game.name} />
                    ))}
                </div>
            </div>
            <div className="footer">
                <p>Just wait, more is on the way!</p>
            </div>
        </div>
    )
}

export default Home;
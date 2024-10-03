import { useState, useEffect } from 'react';
import oversightLogo from '../assets/OversightLogo.png';
import invertedLogo from '../assets/NexLogoInverted.png';
import Card from '../components/Card.jsx';
import './Home.css';
import useLocalStorage from 'use-local-storage';

let localhostApiUrl = "https://oversight-steam-webservice.azurewebsites.net/SteamAPI";

function Home() {
    const [fetchError, setFetchError] = useState(null);
    const [gamesAreLoading, setGamesAreLoading] = useState(false);
    const [games, setGames] = useState([]);
    useEffect(() => {
        handleGetSteamApps();
    }, []);
    const [darkMode] = useLocalStorage('darkMode');


    async function handleGetSteamApps() {

        setGamesAreLoading(true);
        console.log(gamesAreLoading);

        await fetch(localhostApiUrl)
            .then(res => res.json())
            .then(data => {
                const games = data.map(appJson => ({
                    id: appJson.appid,
                    name: appJson.name
                }));
                setGamesAreLoading(false);
                setGames(games);
            })
            .catch(error => {
                setFetchError(error);
                console.log(error);
            })
            .then(setGamesAreLoading(false))
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
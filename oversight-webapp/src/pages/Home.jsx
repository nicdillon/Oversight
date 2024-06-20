import { useState } from 'react';
import oversightLogo from '../assets/OversightLogo.png';
import Card from '../components/Card.jsx';
import './Home.css';

function Home() {
    const [fetchError, setFetchError] = useState(null);
    const [games, setGames] = useState([]);
    const [gamesAreLoading, setGamesAreLoading] = useState(false);

    let localhostApiUrl = "https://localhost:32768/SteamAPI"

    async function handleGetSteamApps() {

        setGamesAreLoading(true);

        await fetch(localhostApiUrl)
            .then(res => res.json())
            .then(data => {
                const games = data.map(appJson => ({
                    id: appJson.appid,
                    name: appJson.name
                }));
                setGames(games);
                setGamesAreLoading(false);
            })
            .catch(error => {
                setFetchError(error);
                console.log(error);
            })
            .then(setGamesAreLoading(false))
    }

    // function handleGetSteamAppDetails(appId) {

    // }

    return (
        <div className='home-container'>
            <div className="logo-container">
                <img src={oversightLogo} className="logo" alt="Oversight Logo" />
            </div>
            <div className="content">
                <h1>Oversight</h1>
                {gamesAreLoading && !fetchError && <i className='fa-circle-o-notch fa-spin' />}
                {!gamesAreLoading && !fetchError && <button onClick={async () => await handleGetSteamApps()}>
                    Get Games
                </button>
                }
                {fetchError && <p>{fetchError}</p>}
                <div className="card">
                    {!gamesAreLoading && games.length > 0 && games.map(game => (
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
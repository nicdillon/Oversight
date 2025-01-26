import React, { useState, useEffect } from "react";
import "./SteamLibrary.css"; // Assuming your styles are in App.css`

const API_ROOT = import.meta.env.VITE_STEAM_WEBAPP_API_ROOT;

const SteamLibrary = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${API_ROOT}/api/steam/games`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }
                const data = await response.json();
                setGames(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (isLoading) {
        return <div className="content">Loading games...</div>;
    }

    if (error) {
        return <div className="content">Error: {error}</div>;
    }

    return (
        <div className="home-container">
            <h1>Your Steam Library</h1>
            <div className="card">
                {games.map((game) => (
                    <div key={game.appid} className="game-card">
                        <img
                            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                            alt={game.name}
                            className="game-image"
                        />
                        <p className="game-title">{game.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SteamLibrary;
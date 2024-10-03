import './About.css';
import SteamLogo from '../assets/SteamLogo.png';
import EpicGamesLogo from '../assets/EpicGamesLogo.png';

export default function About() {


    return (
        <div className='about-container'>
            <h1>About</h1>
            <br /><br />
            <p>NEX is the centralized observation platform for gamers. Gone are the days of treating all game libraries and stores as seperate.
                With NEX, you can see details about every game on every platform, all in one place. Want to see every game you own? Sign in with your 
                credentials for each platform, like Steam and the Playstation Network, to see a consolidated game library and profile. 
            </p>
            <br/> <br/>
            <h2>Get Started</h2>
            <p>Sign in to one of the platforms below to begin building your NEX profile.</p>
            <ul className='platform-list'>
                <li>
                    <img className='platform-logo' src={SteamLogo} alt='Steam' />
                    Steam
                </li>
                <li>
                    <img className='platform-logo' src={EpicGamesLogo} alt='Epic Games' />
                    Epic Games
                </li>
                <li>
                    Xbox
                </li>
                <li>
                    Playstation
                </li>
                <li>
                    Uplay
                </li>
            </ul>
        </div>
    )
}
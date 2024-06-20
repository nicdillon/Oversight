import './About.css';

export default function About() {


    return (
        <div>
            <h1>About</h1>
            <br /><br />
            <p>Oversight is the centralized observation platform for gamers. Gone are the days of treating all game libraries and stores as seperate.
                With Oversight, you can see details about every game on every platform, all in one place. Want to see every game you own? Sign in with your 
                credentials for each platform, like Steam and the Playstation Network, to see a consolidated game library and profile. 
            </p>
            <br/> <br/>
            <h2>Get Started</h2>
            <p>Sign in to one of the platforms below to begin building your Oversight profile.</p>
            <ul className='platform-list'>
                <li>
                    Steam
                </li>
                <li>
                    Epic Games Store
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
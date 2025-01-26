import SteamLibrary from '../components/SteamLibrary'
import './Library.css'

function Library() {
    return (
        <div className="library-container">
            <h1>Library</h1>
            <SteamLibrary></SteamLibrary>
        </div>
    )
}

export default Library
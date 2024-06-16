import SteamLogo from "../assets/SteamLogo.png";
import "./Card.css"

function Card(props) {

    // TODO: create mapping of game platform to platform logo and name

    return(
        <div className="card-container">
            <img src={props.image ?? SteamLogo} alt={props.name + "Image"} />
            <label>{props.name}</label>
        </div>
    );
};

export default Card;
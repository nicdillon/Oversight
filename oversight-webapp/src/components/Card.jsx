/* eslint-disable react/prop-types */
import "./Card.css";

function Card(props) {
    let imageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${props.id}/capsule_184x69.jpg`;

    return (
        <div className="card-container">
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={`${props.name} Image`} className="card-image" />
            </div>
            <div className="card-content">
                <label className="card-title">{props.name}</label>
                <button className="card-button">View Details</button>
            </div>
        </div>
    );
}

export default Card;

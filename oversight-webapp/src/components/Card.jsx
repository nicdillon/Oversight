/* eslint-disable react/prop-types */
import "./Card.css"

function Card(props) {

    // TODO: create mapping of game platform to platform logo and name


    let imageUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${props.id}/capsule_184x69.jpg`

    return(
        <div className="card-container">
            <img src={imageUrl} alt={props.name + "Image"} />
            {/* <label>{props.name}</label> */}
        </div>
    );
}

export default Card;
import React, { Component } from 'react';
import {connect} from 'react-redux';

//THIS IS THE DETAILS PAGE FOR EACH INDIVIDUAL RESTAURANT

class RestaurantDetails extends Component {
    render() {
        let restaurantArray = this.props.details.map(restaurant => {
            return (
                <div className="restaurantDetails">
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.type}</p>
                    <img src={restaurant.photo_url} />
                    <p>{restaurant.address}</p>
                    <p>{restaurant.city}</p>
                    <p>{restaurant.state}</p>
                    <p>{restaurant.zip}</p>
                    <button>Comment</button>
                    <button>Closed?</button>
                    <p>{restaurant.username} says: {restaurant.recommended}</p>
                    <p>{restaurant.comment}</p>
                </div>
            )
        })
        return (
            <div>
                {/* {JSON.stringify(this.props.details)} */}
                {restaurantArray}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        details: reduxStore.detailsReducer
    }
}
export default connect(mapStateToProps)(RestaurantDetails);
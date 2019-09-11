import React, { Component } from 'react';
import {connect} from 'react-redux';
import './RestaurantList.css'

class RestaurantList extends Component {
    componentDidMount() {
            this.getRestaurants();
    }

    getRestaurants = () => {
        this.props.dispatch({
            type: 'FETCH_RESTAURANTS'
        })
    }

    restaurantClickHandler = (id) => {
        console.log('in restaurant click handler');
        console.log('id is', id)
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
        this.props.history.push(`/details/${id}`)
    }

    render() {
        let restaurantArray = this.props.reduxStore.restaurantReducer.map(restaurant => {
            return (
                <div className="restaurantListing" key={restaurant.id} onClick={() => this.restaurantClickHandler(restaurant.id)}>
                    <h4>{restaurant.name}</h4>
                    <img className="listingImage" src={restaurant.photo_url} />
                    <p>{restaurant.type}</p>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.city}</p>
                    <p>{restaurant.state}</p>
                    <p>{restaurant.zip}</p>
                </div>
            )
        })
        return (
            <div>
                {restaurantArray}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}
export default connect(mapStateToProps)(RestaurantList);
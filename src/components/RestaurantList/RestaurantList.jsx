import React, { Component } from 'react';
import {connect} from 'react-redux'

class RestaurantList extends Component {
    componentDidMount() {
            this.getRestaurants();
    }

    getRestaurants = () => {
        this.props.dispatch({
            type: 'FETCH_RESTAURANTS'
        })
    }

    render() {
        let restaurantArray = this.props.reduxStore.restaurantReducer.map(restaurant => {
            return (
                <div>
                    <h4>{restaurant.name}</h4>
                    <img src={restaurant.photo_url} />
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantList.css'
import RestaurantListHeader from '../RestaurantListHeader/RestaurantListHeader';
import RestaurantTypeSelector from '../RestaurantTypeSelector/RestaurantTypeSelector';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';


const styles = {
    card: {
        minWidth: 275,
        backgroundColor: 'red',
        margin: '10px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

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
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <div className="restaurantListing" key={restaurant.id} onClick={() => this.restaurantClickHandler(restaurant.id)}>
                            <Typography variant="h4" className="title" gutterBottom>
                                {restaurant.name}
                            </Typography>
                            <CardMedia
                                className="listingImage"
                                image={restaurant.photo_url}
                                title={restaurant.id}
                            />
                            <Typography variant="paragraph">
                            <p>{restaurant.type}</p>
                                {restaurant.address} {restaurant.city}, {restaurant.state} {restaurant.zip}
                            </Typography>
                            <Typography variant="h5">
                                Tap to see more details
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            )
        })
        return (
            <div>
                <div>
                    <RestaurantListHeader />
                    <RestaurantTypeSelector />
                </div>
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
export default connect(mapStateToProps)(withStyles(styles)(RestaurantList));
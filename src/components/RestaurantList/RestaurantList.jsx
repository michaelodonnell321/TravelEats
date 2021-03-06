import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantList.css'
import RestaurantListHeader from '../RestaurantListHeader/RestaurantListHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';

const styles = {
    card: {
        minWidth: 275,
        backgroundColor: '#ffa726',
        opacity: '.9',
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
    background: {
        backgroundImage: "url('/images/formbackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: "100%",
    },
    listingImage: {
        width: 'auto',
        height: '250px'
    },
    noListings: {
        backgroundImage: "url('/images/formbackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: "750px",
    },
    noListingsText: {
        margin: '10px',
        textAlign: 'center'
    },
    cuisineTypeText: {
        textTransform: 'capitalize',
    }
};

class RestaurantList extends Component {


    componentDidMount() {
        this.getRestaurants();
    }

    getRestaurants = () => {
        if (this.props.user.active_group_id) {
            this.props.dispatch({
                type: 'FETCH_RESTAURANTS',
                payload: this.props.user.active_group_id
            })
        }
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
                                className={this.props.classes.listingImage}
                                image={restaurant.photo_url}
                                title={restaurant.id}
                            />
                            <Typography variant="paragraph">
                                <p className={this.props.classes.cuisineTypeText}>{restaurant.type}</p>
                                {restaurant.address} {restaurant.city}, {restaurant.state} {restaurant.zip}
                                <br />
                                {restaurant.country}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            )
        })
        console.log(this.props.user.active_group_id)
        if (restaurantArray.length === 0 && this.props.user.active_group_id != null) {
            return (
                <div>
                    <Container className={this.props.classes.noListings}>
                        <Typography className={this.props.classes.noListingsText} variant="h5">
                            There are no results in this city yet. Go out and explore and add some listings!
                        </Typography>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                <Container className={this.props.classes.background}>
                    <RestaurantListHeader />
                    {this.props.user.active_group_id != null && <RestaurantSearch />}
                    {restaurantArray}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore,
        user: reduxStore.user
    }
}
export default connect(mapStateToProps)(withStyles(styles)(RestaurantList));
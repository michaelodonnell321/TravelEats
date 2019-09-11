import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import './RestaurantDetails.css';

//THIS IS THE DETAILS PAGE FOR EACH INDIVIDUAL RESTAURANT

// const styles = theme => {(
//     commentList: {
//         background: 'bold',
//     },

// )};

class RestaurantDetails extends Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log(this.props)
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
    }

    render() {
        let commentsArray = this.props.details.map(comment => {
            return (
                <div className="commentList" key={comment.comment_id}>
                    <p>{comment.username} says: {comment.recommended}</p>
                    <p>{comment.comment}</p>
                </div>
            )
        })
        let restaurantArray =
                <div className="restaurantDetails">
                    <h1>{this.props.details[0].name}</h1>
                <p>{this.props.details[0].type}</p>
                <img className="listingImage" src={this.props.details[0].photo_url} />
                <p>{this.props.details[0].address}</p>
                <p>{this.props.details[0].city}</p>
                <p>{this.props.details[0].state}</p>
                <p>{this.props.details[0].zip}</p>
                    <button>Comment</button>
                    <button>Closed?</button>
                </div>

        let name = this.props.details[0].name
        console.log('whole thing is', this.props.details[0])
        console.log('restaurnat is', name);
        return (
            <div>
                {/* {JSON.stringify(this.props.details)} */}
                {restaurantArray}
                {commentsArray}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        details: reduxStore.detailsReducer
    }
}
// export default connect(mapStateToProps)(withStyles(styles)(RestaurantDetails));

export default connect(mapStateToProps)(RestaurantDetails);
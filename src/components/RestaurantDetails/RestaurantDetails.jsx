import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './RestaurantDetails.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import swal from '@sweetalert/with-react';

//THIS IS THE DETAILS PAGE FOR EACH INDIVIDUAL RESTAURANT

// const styles = theme => {(
//     commentList: {
//         background: 'bold',
//     },

// )};


class RestaurantDetails extends Component {

    state = {
        commentBox: true,
        currentComment: '',
    }
    
    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log(this.props)
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
    }

    handleCommentClick = () => {
        console.log('comment was clicked');
        this.setState({
            commentBox: !this.state.commentBox
        })
    }

    handleCommentChange = (event) => {
        this.setState({
            currentComment: event.target.value
        })
    }

    handleCommentSubmit = (id) => {
        console.log('comment submit clicked')
        this.props.dispatch({
            type: 'SUBMIT_COMMENT',
            payload: {
                currentComment: this.state.currentComment,
                id: id,
                restaurant: this.props.match.params.id,
            }
        })

        this.setState({
            commentBox: !this.state.commentBox
        })
        swal(
            <div>
                <h1>Comment submitted!</h1>
            </div>
        )
    }

    editCommentClick = (id) => {
        console.log('edit comment clicked id:', id)
    }

    deleteCommentClick = (id) => {
        console.log('delete comment clicked id:', id)
        this.props.dispatch({
            type: 'DELETE_COMMENT',
            payload: id
        })
    }

    render() {
        let commentsArray = this.props.details.map(comment => {
            return (
                <div>
                    <div className="commentList" key={comment.comment_id}>
                    <p>{comment.username} says: {comment.recommended}</p>
                    <p>{comment.comment}</p>
                    </div>
                    <div>
                        {this.props.user.id === comment.user_id &&
                        <Button variant="outlined" onClick={() => this.editCommentClick(comment.comment_id)}>Edit Comment</Button>}
                        {this.props.user.id === comment.user_id &&
                        <Button variant="outlined" onClick={() => this.deleteCommentClick(comment.comment_id)}>Delete Comment</Button>}
                    </div>
                </div>
            )
        })

        let restaurantArray =
            <div className="restaurantDetails">
                <h1>{this.props.details[0].name}</h1>
                <p>{this.props.details[0].type}</p>
                <img className="listingImage" src={this.props.details[0].photo_url} />
                <p>{this.props.details[0].address} {this.props.details[0].city}, {this.props.details[0].state} {this.props.details[0].zip}
                </p>
                <div>
                {this.state.commentBox ? (
                <Button variant="outlined" onClick={() => this.handleCommentClick(this.props.details[0].id)}>Comment</Button>
                ) : (
                    <div>
                <TextField
                onChange={this.handleCommentChange}
                placeholder="Comment!" />
                <Button variant="outlined" onClick={() => this.handleCommentSubmit(this.props.details[0].id)}>Submit</Button>
                </div>
                )}
                </div>
                <Button variant="outlined">Closed?</Button> 
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
        details: reduxStore.detailsReducer,
        comment: reduxStore.comment,
        user: reduxStore.user
    }
}
// export default connect(mapStateToProps)(withStyles(styles)(RestaurantDetails));

export default connect(mapStateToProps)(RestaurantDetails);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './RestaurantDetails.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import swal from '@sweetalert/with-react';
import ClosedText from '../ClosedText/ClosedText';
import Container from '@material-ui/core/Container';

//THIS IS THE DETAILS PAGE FOR EACH INDIVIDUAL RESTAURANT

const styles = {
    listing: {
        backgroundImage: "url('/images/formbackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: "100%",
    },
    commentArea: {
        padding: '10px',
        backgroundColor: '#ffa726',
        opacity: '0.9',
        margin: '8px'
    },
    listingImage: {
        width: '350px',
        height: '200px'
    }

}


class RestaurantDetails extends Component {

    state = {
        commentBox: true,
        currentComment: '',
        changedComment: '',
        editComment: false,
        commentEditID: 0,
    }

    componentDidMount() {
        //on mount, get the details of the restaurant we are looking at
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
    }

    handleCommentClick = () => {
        //changes state when the comment box is clicked to conditionally render edit field
        this.setState({
            commentBox: !this.state.commentBox
        })
    }

    handleClosedClick = (id) => {
        //dispatches action to close restaurant and conditionally render required elements
        this.props.dispatch({
            type: 'CLOSE_RESTAURANT',
            payload: {
                id: id,
                restaurantID: this.props.match.params.id
            }
        })
    }

    handleOpenClick = (id) => {
        //dispatches action to remove elements that were rendered when restaurant was marked closed
        this.props.dispatch({
            type: 'OPEN_RESTAURANT',
            payload: {
                id: id,
                restaurantID: this.props.match.params.id
            }
        })
    }

    handleCommentChange = (event) => {
        //sets state as user is changing their comment
        this.setState({
            currentComment: event.target.value
        })
    }

    handleCommentSubmit = (id) => {
        //handles submitting a new comment
        this.setState({
            editComment: !this.state.editComment
        })
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
        //sweet alert for comment being submitted
        swal(
            <div>
                <h1>Comment submitted!</h1>
            </div>
        )
    }

    editCommentClick = (id) => {
        //changes state for comment edit button being clicked to conditionally render input for
        //editing the comment
        this.setState({
            editComment: true,
            commentEditID: id
        })
    }

    deleteCommentClick = (id) => {
        //dispatches action to delete comment from database
        console.log('id for delete comment payload is', id)
        if (this.props.details.length > 1) {
            this.props.dispatch({
                type: 'DELETE_COMMENT',
                payload: {
                    id: id,
                    detailsID: this.props.match.params.id
                }
            })
            //sweet alert to let user know their comment has been deleted
            swal(
                <div>
                    <h1>Comment deleted!</h1>
                </div>
            )
        } else {
            //disallows last comment from being deleted
            swal(
                <div>
                    <h1>You cannot delete the only comment, we need to know your thoughts!</h1>
                </div>
            )
            return;
        }
    }

    handleEditCommentChange = (event) => {
        //sets state when user is editing a comment 
        this.setState({
            changedComment: event.target.value
        })
    }

    handleEditCommentClick = (id) => {
        //dispatches action to send changed comment to redux
        this.props.dispatch({
            type: 'EDIT_COMMENT',
            payload: {
                id: id,
                detailsID: this.props.match.params.id,
                changedComment: this.state.changedComment
            }
        })
        this.setState({
            editComment: !this.state.editComment,
        })
        //sweet alert to let user know comment has been edited
        swal(
            <div>
                <h1>Comment edited!</h1>
            </div>
        )
    }



    render() {
        //creates array of all comments for current restaurant
        let commentsArray = this.props.details.map(comment => {
            return (
                <div>
                    <div className="commentList" key={comment.comment_id}>
                        {/* conditionally renders recommendation */}
                        <p>{comment.username} says: {comment.recommended ?  (<p>Recommended</p>) :
                            (<p>Not Recommended</p>)}</p>
                        <p>{comment.comment}</p>
                    </div>
                    <div>
                        {/* conditionally renders edit and delete comment buttons based on userID */}
                        {this.props.user.id === comment.user_id &&
                            <Button variant="outlined" onClick={() => this.editCommentClick(comment.comment_id)}>Edit Comment</Button>}
                        {this.props.user.id === comment.user_id &&
                            <Button variant="outlined" onClick={() => this.deleteCommentClick(comment.comment_id)}>Delete Comment</Button>}
                    </div>
                    <div>
                        {/* conditionally renders input for edit comment */}
                        {this.state.commentEditID === comment.comment_id && this.state.editComment &&
                            <div>
                                <Input onChange={this.handleEditCommentChange} placeholder="edit comment" />
                                <Button onClick={() => this.handleEditCommentClick(comment.comment_id)} variant="outlined">Submit Edit</Button>
                            </div>}
                    </div>
                </div>
            )
        })

        let restaurantArray =
        // uses first index in array from redux store to get needed restaurant information
            <div className="restaurantDetails">
                <h1>{this.props.details[0].name}</h1>
                <p>{this.props.details[0].type}</p>
                <div>
                    {/* handles rendering closed or not closed picture for restaurant based on click */}
                    {this.props.details[0].closed ? (
                        <img className={this.props.classes.listingImage} alt="closed" src={`/images/closed.jpg`} />
                    ) : (
                            <img className={this.props.classes.listingImage} alt={this.props.details[0].id} src={this.props.details[0].photo_url} />
                        )}
                    <p>{this.props.details[0].address} {this.props.details[0].city}, {this.props.details[0].state} {this.props.details[0].zip}
                    </p>
                </div>
                <div>
                    {/* conditionally renders comment input and submit button for new comment */}
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
                {/* handle conditional render for open or closed button */}
                {this.props.details[0].closed ? (
                    <Button onClick={() => this.handleOpenClick(this.props.details[0].id)} variant="outlined">Open?</Button>
                ) : (
                        <Button onClick={() => this.handleClosedClick(this.props.details[0].id)} variant="outlined">Closed?</Button>
                    )}
            </div>

        return (
            <div>
                <Container className={this.props.classes.listing}>
                    <ClosedText />
                    <Container className={this.props.classes.commentArea}>
                        <div>
                            <Container className={this.props.classes.link}>
                                <div>
                                    {/* button to send users back to list on click */}
                                    <Button
                                        variant="outlined"
                                        onClick={() => { this.props.history.push('/list') }}
                                    >Back to Listings</Button>
                                </div>
                            </Container>
                        </div>
                        {restaurantArray}
                    </Container>
                    <Container className={this.props.classes.commentArea}>
                        {commentsArray}
                    </Container>
                </Container>
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

export default connect(mapStateToProps)(withStyles(styles)(RestaurantDetails));
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
    },
    listingImage: {
        width: '350',
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

    handleClosedClick = (id) => {
        console.log('closed was clicked!');
        this.props.dispatch({
            type: 'CLOSE_RESTAURANT',
            payload: {
                id: id,
                restaurantID: this.props.match.params.id
            }
        })
    }

    handleOpenClick = (id) => {
        console.log('open was clicked!');
        this.props.dispatch({
            type: 'OPEN_RESTAURANT',
            payload: {
                id: id,
                restaurantID: this.props.match.params.id
            }
        })
    }

    handleCommentChange = (event) => {
        this.setState({
            currentComment: event.target.value
        })
    }

    handleCommentSubmit = (id) => {
        this.setState({
            editComment: !this.state.editComment
        })
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
        this.setState({
            editComment: true,
            commentEditID: id
        })
    }

    deleteCommentClick = (id) => {
        console.log('id for delete comment payload is', id)
        if (this.props.details.length > 1) {
            this.props.dispatch({
                type: 'DELETE_COMMENT',
                payload: {
                    id: id,
                    detailsID: this.props.match.params.id
                }
            })
            swal(
                <div>
                    <h1>Comment deleted!</h1>
                </div>
            )
        } else {
            swal(
                <div>
                    <h1>You cannot delete the only comment, we need to know your thoughts!</h1>
                </div>
            )
            return;
        }
    }

    handleEditCommentChange = (event) => {
        this.setState({
            changedComment: event.target.value
        })
    }

    handleEditCommentClick = (id) => {
        console.log('edit comment clicked', this.state.editComment)
        console.log('edit comment clicked id:', id)
        console.log('edit comment', this.state)

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
        swal(
            <div>
                <h1>Comment edited!</h1>
            </div>
        )
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
                    <div>
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
            <div className="restaurantDetails">
                <h1>{this.props.details[0].name}</h1>
                <p>{this.props.details[0].type}</p>
                <div>
                    {this.props.details[0].closed ? (
                        <img className={this.props.classes.listingImage} alt="closed" src={`/images/closed.jpg`} />
                    ) : (
                            <img className={this.props.classes.listingImage} alt={this.props.details[0].id} src={this.props.details[0].photo_url} />
                        )}
                    <p>{this.props.details[0].address} {this.props.details[0].city}, {this.props.details[0].state} {this.props.details[0].zip}
                    </p>
                </div>
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
                {this.props.details[0].closed ? (
                    <Button onClick={() => this.handleOpenClick(this.props.details[0].id)} variant="outlined">Open?</Button>
                ) : (
                        <Button onClick={() => this.handleClosedClick(this.props.details[0].id)} variant="outlined">Closed?</Button>
                    )}
            </div>

        let name = this.props.details[0].name
        console.log('whole thing is', this.props.details[0])
        console.log('restaurnat is', name);
        return (
            <div>
                <Container className={this.props.classes.listing}>
                    <ClosedText />
                    <Container className={this.props.classes.commentArea}>
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
// export default connect(mapStateToProps)(withStyles(styles)(RestaurantDetails));

export default connect(mapStateToProps)(withStyles(styles)(RestaurantDetails));
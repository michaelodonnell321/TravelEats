import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const styles = {
    link: {
        width: 'auto',
    }
}

class BackToListings extends Component {
    render() {
        return (
            <div>
                <Container className={this.props.classes.link}>
                    <div>
                <Button
                variant="outlined"
                onClick={() => {this.props.history.push('/list')}}
                >
                                Back to Listings
                </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(BackToListings));
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

class LoginButton extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.history.push('/home')} color="inherit">Login</Button>
            </div>
        );
    }
}

export default withRouter(LoginButton);
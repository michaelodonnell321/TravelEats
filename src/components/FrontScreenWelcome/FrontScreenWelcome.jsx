import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    mainText:{
        padding: '10px',
        backgroundColor: '#ffa726',
        opacity: '0.9',
        color: 'black'
    }
}

class FrontScreenWelcome extends Component {
    render() {
        return (
            <div className={this.props.classes.mainText}>
                Welcome to TravelEats, where you can easily share restaurant recommendations and your
                favorite travel memories with friends and family.
                <br /><br />
                Log in to get started! If you have not registered yet, click Register.
                <br /><br />
                Thanks for using TravelEats, bon voyage!
            </div>
        );
    }
}

export default withStyles(styles)(FrontScreenWelcome);
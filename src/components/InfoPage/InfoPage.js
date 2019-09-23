import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = {
  background: {
    backgroundImage: "url('/images/formbackground.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: "600px",
  },
  infoText: {
    backgroundColor: '#ffa726',
    opacity: '0.9',
    color: 'black'
  }
}

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  render() {
    return (
      <div>
        <Container className={this.props.classes.background}>
          <div className="formDiv">
            <Typography component="div">
              <Box textAlign="center" fontSize="h3.fontSize" className="formName">What is TravelEats?
                    </Box>
            </Typography>
          </div>
          <p className={this.props.classes.infoText}>
            TravelEats is a travel journal and restaurant listing service for groups to use to be able to share memories and
            restaurant recommendations with each other, no matter where in the world (or beyond!) their travels may take them.
        <br />
            Bon Voyage!
          </p>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(InfoPage);

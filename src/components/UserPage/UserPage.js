import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  background: {
    backgroundImage: "url('/images/formbackground.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: 750,
  },
  mainText: {
    padding: '10px',
    margin: 10,
    backgroundColor: '#ffa726',
    opacity: '0.9',
    color: 'black'
  }
}

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div className={props.classes.background}>
    <div className={props.classes.mainText}>
      <p>
      Welcome, { props.user.username }! Click on Listings above to view restaurants that
      have been added by your current active group.
      <br/><br/>
      If you would like to create a new group to invite friends and family to join,
      click Create Group from the Listings page.
      <br/><br/>
      If you have a group ID number and would like to join that group, click on Edit
        Profile from the Listings page to join!
    </p></div>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage));

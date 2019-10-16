import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import FrontScreenWelcome from '../FrontScreenWelcome/FrontScreenWelcome';

const styles = {
  background: {
    backgroundImage: "url('/images/formbackground.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '725px',
  },
  addForm: {
    padding: '10px',
    backgroundColor: '#ffa726',
    opacity: '0.9',
    paddingTop: '30px',
    opacity: '.8'
  },
  inputText: {
    color: 'black',
  },
  buttons: {
    backgroundColor: 'grey',
  }
}
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Container className={this.props.classes.background}>
        <div className={this.props.classes.addForm}>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username" className={this.props.classes.inputText}>
                Username:
              <Input
                  className={this.props.classes.input}
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password" className={this.props.classes.inputText}>
                Password:
              <Input
                  className={this.props.classes.input}
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
                className={this.props.classes.buttons}
              />
            </div>
          </form>
          <center>
            <button
              type="button"
              className={this.props.classes.buttons}
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
            >
              Register
          </button>
          </center>
        </div>
        <div>
        <FrontScreenWelcome />
        </div>
      </Container>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));

import React, { Component } from 'react';
import {connect} from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import swal from '@sweetalert/with-react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    searchBar: {
        color: 'black',
        backgroundColor: '#ffa726',
        opacity: '.8',
        margin: '5px'
    }
}


class RestaurantSearch extends Component {
    state={
        searchText: ''
    }
    
    handleSearchClick = () => {
        if (this.state.searchText === '') {
            swal (
                <h1>
                    Please enter a city to search for!
                </h1>
            )
            return;
        }
        console.log('search clicked');
        let searchText = this.state.searchText.toLowerCase();
        this.props.dispatch({
            type: 'GET_SEARCH_RESULTS',
            payload: searchText
        })
    }

    handleChange = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    render() {
        return (
            <div>
                <TextField
                className={this.props.classes.searchBar}
                label="Search by City"
                onChange={(event) => this.handleChange(event)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                        <IconButton>
                            <SearchIcon onClick={this.handleSearchClick}/>
                            </IconButton>
                            </InputAdornment>
                    )
                }}
                />
            </div>
        );
    }
}

export default connect()(withStyles(styles)(RestaurantSearch));
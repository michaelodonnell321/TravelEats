import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';



class GroupGenerator extends Component {
    
    //changes what group a user is actively in on click
    handleGroupClick = (name) => {
        console.log('clicked name', name);
        console.log('id of click', this.props.user.id)
        this.props.dispatch({
            type: 'CLICK_ACTIVE_GROUP',
            payload: {
                name: name,
                id: this.props.user.id
            }
        })
    }

    render() {
        return (
            <div>
                {/* maps over array from reducer to generate all groups user is a memeber of */}
                {this.props.group.map(group => {
                    return (
                        <div>
                            <Button value={group.group_name} onClick={() => this.handleGroupClick(group.id)}variant="outline">
                            {group.group_name}
                            </Button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        group: reduxStore.groupReducer,
        user: reduxStore.user
    }
}
export default connect(mapStateToProps)(GroupGenerator);
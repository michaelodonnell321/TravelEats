import React, { Component } from 'react';
import {connect} from 'react-redux';

class GroupGenerator extends Component {
    render() {
        return (
            <div>
                {this.props.group.map(group => {
                    return (
                        <div>
                            {group.group_name}
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
    }
}
export default connect(mapStateToProps)(GroupGenerator);
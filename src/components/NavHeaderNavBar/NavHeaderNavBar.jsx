import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography';

function NavHeaderNavBar(props) {

        return (
            <List component ="nav">
                <ListItem component="div">
                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            Home
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            Listings
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            Add Restaurant
                        </TypoGraphy>
                    </ListItemText>
                </ListItem>
            </List>
        );
    }
}

export default NavHeaderNavBar;
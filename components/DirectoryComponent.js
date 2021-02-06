import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

//Renders a list of campsites (name, description, image)
class Directory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {
        title: 'Directory'
    }
    
    render() {
        // Directory component automatically has navigation prop because it was set up as a screen component in Main nav
        const { navigate } = this.props.navigation; // object DESTRUCTURING of navigate() from the navigation prop
                                                    // assigns this.props.navigation.navigate() to a const called 'navigate'
                                                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring
        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    // onPress={() => this.props.onPress(item.id)}  //calls a user-defined event handler
                    // https://reactnavigation.org/docs/4.x/navigation-prop/#navigate---link-to-other-screens
                    onPress={
                        () => navigate(
                                'CampsiteInfo', // routeName - a destination that has been registered somewhere in the app's router
                                { campsiteId: item.id } // optional params to merge into the destination route
                            )
                        }
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    };

}

export default Directory;
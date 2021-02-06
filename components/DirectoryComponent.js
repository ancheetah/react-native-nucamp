import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';

// Redux
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//import { CAMPSITES } from '../shared/campsites';

const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};

//Renders a list of campsites (name, description, image)
class Directory extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         campsites: CAMPSITES
    //     };
    // }

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
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    // onPress={() => this.props.onPress(item.id)}  //calls a user-defined event handler
                    // https://reactnavigation.org/docs/4.x/navigation-prop/#navigate---link-to-other-screens
                    onPress={
                        () => navigate(
                                'CampsiteInfo', // routeName - a destination that has been registered somewhere in the app's router
                                { campsiteId: item.id } // optional params to merge into the destination route
                            )
                        }
                    //leftAvatar={{ source: require('./images/react-lake.jpg')}}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        return (
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    };

}

export default connect(mapStateToProps)(Directory);
import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';

//Navigation
// expo install react-navigation@4
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view react-navigation-stack@^1.10.3
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';  //expo install react-navigation-drawer
import { createAppContainer } from 'react-navigation';


const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    }, 
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;

/*
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        // this.state.selectedCampsite = campsiteId; //will not re-render with the new state
        this.setState({selectedCampsite: campsiteId}); //setting the state this way causes listeners to update the state when it is changed
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(
                        campsite => campsite.id === this.state.selectedCampsite)[0]}
                />
            </View>
        );
    }
}
*/
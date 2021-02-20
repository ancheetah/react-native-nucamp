import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';

// Navigation
// expo install react-navigation@4
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view react-navigation-stack@^1.10.3
import { View, Platform, StyleSheet, Text, ScrollView, Image,
        Alert, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';  //expo install react-navigation-drawer
import { createAppContainer } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import NetInfo from '@react-native-community/netinfo';

//Redux
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions,
    fetchPartners } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

// Main component holds navigation just like it did for React <Router> navigation
// https://reactnavigation.org/docs/4.x/stack-navigator/#routeconfigs

const DirectoryNavigator = createStackNavigator(
    { // the route configs object maps a route name to a route config
      //Route Name: { screen, path, navigationOptions }
        Directory: { 
            screen: Directory, // the value of screen is a React component that will be the main content on the screen
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {   // the second argument can be used for addtl config but is optional 
        initialRouteName: 'Directory', //default component to display when menu is opened
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
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        initialRouteName: 'Home',   // First page that loads should be Home, not Login
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent
    }
);

// Connect the top level nav component (i.e. MainNavigator) to the React app using createAppContainer
// createAppContainer is a wrapper which takes one nav component
const AppNavigator = createAppContainer(MainNavigator); // returns a component, adds basic nav functions like a back button

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

        this.showNetInfo();

        this.unsubscribeNetInfo = NetInfo.addEventListener(connectionInfo => {
            this.handleConnectivityChange(connectionInfo);
        });
    }

    componentWillUnmount() {
        this.unsubscribeNetInfo();
    }
    
    handleConnectivityChange = connectionInfo => {
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.';
                break;
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.';
                break;
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.';
                break;
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.';
                break;
        }
        (Platform.OS === 'ios')
            ? Alert.alert('Connection change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    }

    showNetInfo = async () => {
        // use "await" keyword to wait while network connection info is being fetched before continuing to next line
        let connectionInfo = await NetInfo.fetch(); 

        (Platform.OS === 'ios')
                ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
                : ToastAndroid.show('Initial Network Connectivity Type: ' +
                    connectionInfo.type, ToastAndroid.LONG);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight  // example of how you would tweak styling for iOS
            }}>
                {/* AppNavigator contains Directory and Campsite Info components as well as other pages */}
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);

/*
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    // this function is replaced by RN navigation routing later on
    onCampsiteSelect(campsiteId) {
        // this.state.selectedCampsite = campsiteId; //will not re-render with the new state
        this.setState({selectedCampsite: campsiteId}); //setting the state this way causes listeners to update the state when it is changed
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}   //this does not call/execute onCampsiteSelect; instead it passes the function as a prop to <Directory>
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
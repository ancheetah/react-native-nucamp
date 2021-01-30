import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        return (
            <ScrollView></ScrollView>
        );
    }
}

export default About;
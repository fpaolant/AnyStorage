import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ButtonText } from './typo';

class MyButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    handlePressIn() {
        this.setState({
            pressed: true,
        });
        this.props.onPressIn && this.props.onPressIn();
    }

    handlePressOut() {
        this.setState({
            pressed: false,
        });
        this.props.onPressOut && this.props.onPressOut();
    }

    render() {
        const {text, children} = this.props;
        const {pressed} = this.state;
        return (
                <Pressable
                    {...this.props}
                    style={[styles.pressable, pressed ? styles.pressed : {}]}
                    onPress={this.props.onPress}
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                >
                    <ButtonText white text={text ? text : children} />
                </Pressable>
        );
    }

}

export default MyButton;

const styles = StyleSheet.create({
    pressable: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#bbb',
        borderRadius: '5'
    },
    pressed: {
        backgroundColor: '#dddddd',
    },
});

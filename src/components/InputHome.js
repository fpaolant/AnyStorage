import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const INITIAL_STATE = {
    focusIn: false,
};

class InputHome extends React.Component {

    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    render() {
        const {focusIn} = this.state;
        const {value, placeholder, handleChangeText, style} = this.props;
        return <TextInput
            {...this.props}
            style={[
                styles.input,
                focusIn ? styles.inputFocused : {},
                style,
            ]}
            value={value}
            //defaultValue={"ciao"}
            onChangeText={handleChangeText}
            placeholder={placeholder? placeholder: ''}
            onFocus={() => this.setState({focusIn: true})}
            onBlur={() => this.setState({focusIn: false})}
        />;
    }
}

export default InputHome;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#d1d1d1',
        minWidth: 200,
        padding: 20,
        width: '100%'
    },
    inputFocused: {
        borderColor: 'red',
    },
});

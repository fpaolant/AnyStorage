import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MyButton from '../components/MyButton';
import Page from '../components/Page';
import Images from '../images';
import { Title, Subtitle } from '../components/typo';
import { firstAccess } from '../actions';



class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        this.handleGettingStarted = this.handleGettingStarted.bind(this);
    }
 
    handleGettingStarted() {
        const {dispatch, navigation: { navigate }} = this.props;
        dispatch(firstAccess());
        //navigate && navigate('Home');

    }


    render() {
        const {navigate} = this.props;

        return (
            <Page style={styles.container}>
                <Image 
                    source={Images.Luggage} 
                    style={styles.image}
                    resizeMode={'contain'}
                />
                <Title text="Benvenuto" />
                <Subtitle text="l'applicazione per liberarti della valigia" />
                <MyButton 
                    text="Inizia ora" 
                    onPress={this.handleGettingStarted} />
            </Page>
        );
    }

}



export default connect()(SplashScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 120
    }
    
});
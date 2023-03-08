import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import SplashScreen from "../pages/SplashScreen";
import HomeScreen from "../pages/HomeScreen";
import { CHANGE_PAGE } from "../actions/action-type";
import { changePage } from "../actions";
import { sAppActivePage } from "../selectors";

class Router extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const {page, navigate} = this.props;
        return (
            <> 
                { page==='splash' && <SplashScreen navigate={navigate} />}
                { page==='home' && <HomeScreen />}
            </>
        );
    }

}

//export default Router;
function mapStateToProps(state) {
    const {page} = state.app
    return {
        page: sAppActivePage(state)
    }
}
function mapDispatchToProps(dispatch) {
    return {
        navigate: function(page) {
            
            switch(page) {
                case 'splash':
                case 'home':
                    dispatch(changePage(page));
                    break;
            }
        }
    }
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router);
export default RouterContainer;

const styles = StyleSheet.create({
    container: {

    }
})
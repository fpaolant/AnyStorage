import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import { changePage } from "../actions";
import { sAppActivePage } from "../selectors";

class Initiator extends React.Component {

    constructor(props) {
        super(props);
        
        this.getPage = async () => {
            try {
                return await AsyncStorage.getItem('page');
            } catch(e) {
                // error reading value
            }
            
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        this.getPage().then(page => {
           if(page!=null) {
            dispatch(changePage(page));
           }
        })
         
    }

    componentWillUnmount() {
        console.log("unmount");
        console.log(this.page)
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        page: sAppActivePage(state)
    }
}

export default connect(mapStateToProps)(Initiator);
//export default Initiator;
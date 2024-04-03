import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "../store/store";
import Act from "./Act";



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <h1>Here mee</h1>
                <Act/>
            </Provider>
        );
    }
}

export default App;
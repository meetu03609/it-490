import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import appRoutes from './routes';
import MainContext from "../context/main-context";

class Index extends Component {
    state = {
        user: null,
        products: [],
    };

    componentWillMount() {
        this.updateUserStateFromLocalStorage();
    }


    updateUserStateFromLocalStorage = () => {
        let userStorage = localStorage.getItem('User');

        let {user} = this.state;

        if (userStorage) {
            user = JSON.parse(userStorage);
        }

        this.handleUpdateMainState({user});

    };

    handleUpdateMainState = object => this.setState({...object});

    render() {
        return (
            <MainContext.Provider value={{
                ...this.state,
                handleUpdateMainState: this.handleUpdateMainState,
                updateUserStateFromLocalStorage: this.updateUserStateFromLocalStorage,
            }}>
                <Switch>
                    {appRoutes.map((route, key) =>
                        <Route
                            key={key}
                            exact
                            {...route}
                        />
                    )}
                </Switch>
            </MainContext.Provider>
        );
    }
}

export default withRouter(Index);

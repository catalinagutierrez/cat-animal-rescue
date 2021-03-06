import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import DiscoverPage from './pages/discover/discover.component';
import DonatePage from './pages/donate/donate.component';
import AdoptionPage from './pages/adoption/adoption.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { selectCurrentUser } from './redux/user/user.selectors';

// import './App.css';
import { GlobalStyle } from './global.styles';

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        //set the user reducer with the new user object
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        //always unsubscribe to prevent data leaks.
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <GlobalStyle />
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/discover' component={DiscoverPage} />
                    <Route exact path='/donate' component={DonatePage} />
                    <Route exact path='/adoption' component={AdoptionPage} />
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

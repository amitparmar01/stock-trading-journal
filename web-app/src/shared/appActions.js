import AppDispatcher from './appDispatcher';

var AppActions = {
    signIn(email, password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: "AUTHENTICATE",
            data: { user: { id: 123, email: "user@domain.com" } }
        });
    }
}

module.exports = AppActions;
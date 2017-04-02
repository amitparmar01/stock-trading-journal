import AppDispatcher from './appDispatcher';
import AppConstants from './appConstants';

var AppActions = {
    signUp(email, password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.SIGN_UP,
            data: { user: { id: 123, email: "user@domain.com" }, error: null }
        });
    },
    signIn(email, password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.SIGN_IN,
            data: { user: { id: 123, email: "user@domain.com" }, error: null }
        });
    },
    resetPassword(password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.RESET_PASSWORD,
            data: { error: null }
        });
    },
    updateTitle(title) {
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.UPDATE_TITLE,
            data: title
        });
    }
}

module.exports = AppActions;
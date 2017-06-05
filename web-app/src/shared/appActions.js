import AppDispatcher from './appDispatcher';
import AppConstants from './appConstants';

var AppActions = {
    signUp(email, password) {
        //simulate ajax call with ServerApi
        if (email === "user@email.com") {
            AppDispatcher.dispatch({
                actionType: AppConstants.ActionTypes.SIGN_UP,
                data: { user: { email: email }, error: "", ajaxError: "" }
            });
        }
        else {
            AppDispatcher.dispatch({
                actionType: AppConstants.ActionTypes.SIGN_IN,
                data: { user: null, error: "Email already exists. Try again!", ajaxError: "" }
            });
        }
    },

    signIn(email, password) {
        //simulate ajax call with ServerApi
        if (email === "user@email.com") {
            AppDispatcher.dispatch({
                actionType: AppConstants.ActionTypes.SIGN_IN,
                data: { user: { email: email }, error: "", ajaxError: "" }
            });
        }
        else {
            AppDispatcher.dispatch({
                actionType: AppConstants.ActionTypes.SIGN_IN,
                data: { user: null, error: "Email or password is invalid. Try again!", ajaxError: "" }
            });
        }        
    },

    resetPassword(password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.RESET_PASSWORD,
            data: { error: "", ajaxError: "" }
        });
    },

    SendContactUsMessage(reason, message) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.SEND_CONTACT_US_MESSAGE,
            data: { error: "", ajaxError: "" }
        });
    },

    updateTitle(title) {
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.UPDATE_TITLE,
            data: { title: title }
        });
    }
}

export default AppActions;
import AppDispatcher from './appDispatcher';
import AppConstants from './appConstants';

var AppActions = {
    signIn(email, password) {
        //simulate ajax call with ServerApi
        AppDispatcher.dispatch({
            actionType: AppConstants.ActionTypes.AUTHENTICATE,
            data: { user: { id: 123, email: "user@domain.com" }, error: null }
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
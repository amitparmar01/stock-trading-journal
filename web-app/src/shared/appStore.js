
import EventEmitter from 'events';
import AppDispatcher from './appDispatcher';
import AppConstants from './appConstants';

const CHANGE_EVENT = 'change';
const AUTH_STORAGE_KEY = 'USER_AUTH';

class AppStore extends EventEmitter {
    constructor(props) {
        super(props);
        
        this.title = "";

        this.user = null;
        this.error = "";
        
        AppDispatcher.register(action => {
            switch (action.actionType) {
                case AppConstants.ActionTypes.UPDATE_TITLE:
                    this.title = action.data;
                    this.emit(CHANGE_EVENT);
                    break;
                case AppConstants.ActionTypes.SIGN_IN:
                case AppConstants.ActionTypes.SIGN_UP:
                    if (action.data.error === "") {
                        this.error = "";
                        this.user = action.data.user;
                        sessionStorage.setItem(AUTH_STORAGE_KEY, action.data.user.email);
                    }
                    else {
                        this.user = null;
                        this.error = action.data.error;
                    }
                    
                    this.emit(CHANGE_EVENT);
                    break;
                case AppConstants.ActionTypes.RESET_PASSWORD:
                    this.error = action.data.error;
                    this.emit(CHANGE_EVENT);
                    break;
                default:
                    break;
           } 
        });
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getTitle() {
        return this.title;
    }

    isUserAuthenticated() {
        var authStorage = sessionStorage.getItem(AUTH_STORAGE_KEY);
        return  this.user != null && authStorage != null;
    }

    getAuthenticatedUser() {
        return this.user;
    }

    getUserLastError() {
        return this.error;
    }

    signOut() {
        this.user = null;
        this.error = "";
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
}

const appStore = new AppStore();
export default appStore;

import EventEmitter from 'events';
import AppDispatcher from '../appDispatcher';

const CHANGE_EVENT = 'change';
const AUTH_STORAGE_KEY = 'USER_AUTH';

class LoginStore extends EventEmitter {
    constructor(props) {
        super(props);

        this.user = null;
        this.error = "";
        
        AppDispatcher.register(action => {
           switch (action.actionType) {
               case 'AUTHENTICATE':
                   this.user = action.data.user;
                   this.error = action.data.error;
                   sessionStorage.setItem(AUTH_STORAGE_KEY, action.data.user.id);
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

    isUserAuthenticated() {
        var authStorage = sessionStorage.getItem(AUTH_STORAGE_KEY);
        return  this.user != null && authStorage != null;
    }

    getAuthenticatedUser() {
        return this.user;
    }

    getLastError() {
        return this.error;
    }

    signOut() {
        this.user = null;
        this.error = "";
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
}

const loginStore = new LoginStore();
export default loginStore;
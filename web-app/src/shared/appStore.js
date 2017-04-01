
import EventEmitter from 'events';
import AppDispatcher from './appDispatcher';
import AppConstants from './appConstants';

const CHANGE_EVENT = 'change';

class AppStore extends EventEmitter {
    constructor(props) {
        super(props);
        
        this.title = "";

        AppDispatcher.register(action => {
           switch (action.actionType) {
               case AppConstants.ActionTypes.UPDATE_TITLE:
                   this.title = action.data;
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
}

const appStore = new AppStore();
export default appStore;
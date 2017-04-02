import keyMirror from 'keymirror';

var APIRoot = "http://localhost:3002";

module.exports = {
    API: {
        Root: "http://localhost:3002",
        Endpoints: {
            LOGIN:          APIRoot + "/v1/login",
            REGISTRATION:   APIRoot + "/v1/users",
            STORIES:        APIRoot + "/v1/stories"
        }
    },
    Control: {
        Small: 50,
        Medium: 80,
        Big: 120
    },
    ActionTypes: keyMirror({
    // App
    UPDATE_TITLE: null,

    // Login
    SIGN_UP: null,
    SIGN_IN: null,
    RESET_PASSWORD: null
  })
};
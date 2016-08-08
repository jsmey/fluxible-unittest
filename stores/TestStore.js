var createStore = require('fluxible/addons').createStore;


var TestStore = createStore({
    storeName: 'TestStore',
    initialize: function () {
        this.data = {message: ''};
    },
    handleChange: function (payload) {
        this.data.message = payload;
        this.emitChange();
    },
    handlers: {
        'UPDATE_DATA': 'handleChange'
    },
    getMessage: function () {
        return {
            message: this.data.message.toString()
        };
    },
    dehydrate: function () {
        return {
            message: this.data.message.toString()
        };
    },
    rehydrate: function (state) {
        this.data = state.data;
    }
});

module.exports = TestStore;

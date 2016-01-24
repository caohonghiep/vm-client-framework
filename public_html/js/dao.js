//Data Access Object
var GenericDAO = Class({
    initialize: function (table, fields) {
        this.db = window.dataConfig.db;
        this.table = table;
        this.fields = fields;
    },
    table: '',
    fields: [],
    db : null,
    add: function (value, successCallback, errorCallBack) {
        var table = this.table;
        var transaction = this.db.transaction([table], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('A row have been added to "' + table + '".');
            if (successCallback) {
                successCallback(event.target.result);
            }
        };
        transaction.onerror = function (event) {
            if (errorCallBack) {
                errorCallBack(event);
            }
            console.log('A row have been added to "' + table + '".' + 'Error :(');
        };
        var objectStore = transaction.objectStore(table);
        objectStore.add(value);
    },
    get: function (id, successCallback, errorCallBack) {
        var table = this.table;
        var request = this.db.transaction([table], "readwrite");
        request.onsuccess = function (event) {
            if (successCallback) {
                successCallback(event.target.result);
            }
        };
        request.objectStore(table).get(id);
    },
    getAll: function (successCallback, errorCallBack) {
        var table = this.table;
        var objectStore = this.db.transaction([table]).objectStore(table);

        objectStore.openCursor().onsuccess = function (event) {
            if (successCallback) {
                var cursor = event.target.result;
                if (cursor) {
                    successCallback(cursor);
                    cursor.continue();
                } else {

                }
            }
        };
    },
    update: function (id, data, successCallback, errorCallBack) {
        var table = this.table;
        var transaction = this.db.transaction([table], "readwrite");
        var objectStore = transaction.objectStore(table);
        var request = objectStore.get(id);
        request.onerror = function (event) {};
        request.onsuccess = function (event) {
            var requestData = request.result;
            for (var name in data) {
                requestData[name] = data[name];
            }
            var requestUpdate = objectStore.put(requestData);
            requestUpdate.onerror = function (event) {};
            requestUpdate.onsuccess = function (event) {
                if (successCallback) {
                    successCallback(event.target.result);
                }
            };
        };
    },
    find: function (id, data, successCallback, errorCallBack) {
    },
    search: function (id, data, successCallback, errorCallBack) {

    }
});

var ProductDao = Class(GenericDAO, {
    initialize: function () {
        this.db = window.dataConfig.db;
        this.table = 'product';
        this.fields = dataConfig.tables['product'];
    }
});

var UserDao = Class(GenericDAO, {
    initialize: function () {
        this.db = window.dataConfig.db;
        this.table = 'user';
        this.fields = dataConfig.tables['user'];
    }
});

var SiteDao = Class(GenericDAO, {
    initialize: function () {
        this.db = window.dataConfig.db;
        this.table = 'site';
        this.fields = dataConfig.tables['site'];
    }
});
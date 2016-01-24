(function () {
    var dataConfig = {
        databaseName: 'testData',
        tables: {
            site: {fields: ['id', 'name', 'description'], synUrl: '', lastSyn: 0},
            user: {fields: ['id', 'name', 'age'], synUrl: '', lastSyn: 0},
            product: {fields: ['id', 'name', 'description', 'shine', 'price', 'rarity', 'color', 'faces', 'images'], synUrl: '', lastSyn: 0}
        }
    };
    function databaseInit() {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var connection, db;

        if (!window.indexedDB)
        {
            console.log("Your Browser does not support IndexedDB");
        } else {
            connection = window.indexedDB.open(dataConfig.databaseName, 2);
            connection.onerror = function (event) {
                console.log("Error opening DB", event);
            };
            connection.onupgradeneeded = function (event) {
                dataConfig.firstLoad = true;
                console.log("Upgrading");
                db = event.target.result;
                for (var table in dataConfig.tables) {
                    var fields = dataConfig.tables[table].fields;
                    if (fields instanceof Array && fields.length > 0) {
                        var objectTable = db.createObjectStore(table, {keyPath: fields[0]});
                        for (var j = 0 + 1; j < fields.length; j++) {
                            var field = fields[j];
                            objectTable.createIndex(field, field, {unique: false});
                        }
                    }
                }
            };
            connection.onsuccess = function (event) {
                console.log("Success opening DB");
                db = event.target.result;
                dataConfig.db = db;
                angular.bootstrap(document, ['demo']);

            };
            dataConfig.connection = connection;
            window.dataConfig = dataConfig;
        }
    }
    window.databaseInit=databaseInit;
})();
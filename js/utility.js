
var dbPromise = idb.open('posts-store', 1, function (db) {
    if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', {keyPath: 'key',autoIncrement: true});
    }
    if (!db.objectStoreNames.contains('parametre')) {
        db.createObjectStore('parametre', {keyPath: 'min_temperature'});
    }
    //creating store sync parameters
    if (!db.objectStoreNames.contains('sync-parameters')) {
        db.createObjectStore('sync-parameters', {keyPath: 'id'});
    }
});

function writeData(st, data) {
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}

function readAllData(st) {
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
        });
}

function clearAllData(st) {
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.clear();
            return tx.complete;
        });
}

function deleteItemFromData(st, id) {
    dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.delete(id);
            return tx.complete;
        })
        .then(function() {
            console.log('Item deleted!');
        });
}
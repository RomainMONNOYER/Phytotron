var dbPromise=idb.open('store',1,function (db) {
    if(!db.objectStoreNames.contains('smth')){
        db.createObjectStore('smth',{keyPath:'id'});
    }
})
function writeData(st,data) {
    return dbPromise
        .then(function (db) {
            var tx = db.transaction(st,'readwrite');
            var store = tx.objectStore(st);
            store.pute(data);
            return tx.complete;
        });
}
function readAllData(st){
    return dbPromise
        .then(function(db){
           var tx= db.transaction(st,'readonly');
           var store=tx.objectStore(st);
           return store.getAll();
        });
}
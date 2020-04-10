function execute(data){
    console.log(data);


}
function updateUI (data) {
    for (var i = 0; i < data.length; i++) {
        execute(data[i]);
        updateInputs(data[i]);
    }

}

var url="https://pogotron-646fd.firebaseio.com/parametre.json";
var networkDataReceived = false;

fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        networkDataReceived = true;
        console.log('From web', data);
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key]);
            updateUI(data[key]);
        }
    });
if ('indexedDB' in window) {
    readAllData('parametre')
        .then(function(data) {
            if (!networkDataReceived) {
                console.log('From cache', data);
            }
        });
}


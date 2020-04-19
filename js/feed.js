

function execute(data){
    console.log(data);
    var newDiv=document.createElement("div");
    newDiv.className=data.id;
    newDiv.textContent="Id : " + data[0] + " Type : " + data[1];

    var currentDiv=document.getElementById("temperature");
    currentDiv.appendChild(newDiv);

}
function updateUI (data) {
    for (var i = 0; i < data.length; i++) {
        execute(data[i]);
    }

}
var url="https://pogotron-646fd.firebaseio.com/posts.json";
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
        }
        createGraph(dataArray);
        updateUI(dataArray);
    });
if ('indexedDB' in window) {
    readAllData('posts')
        .then(function(data) {
            if (!networkDataReceived) {
                console.log('From cache', data);
                updateUI(data);
            }
        });
}
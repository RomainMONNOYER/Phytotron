

function execute(data){
    console.log(data);
    var newDiv=document.createElement("div");
    newDiv.className=data.id;
    newDiv.textContent="Id : " + data.id + " Type : " + data.type;

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
        updateUI(dataArray);
    })
if ('caches' in window) {
    caches.match(url)
        .then(function(response) {
            if (response) {
                return response.json();
            }
        })
        .then(function(data) {
            console.log('From cache', data);
            if (!networkDataReceived) {
                var dataArray = [];
                for (var key in data) {
                    dataArray.push(data[key]);
                }
                updateUI(dataArray)
            }
        });
}
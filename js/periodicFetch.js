var url="https://pogotron-646fd.firebaseio.com/parametre.json";

function periodicFetch(){
    setInterval(function(){
        console.log("20sec passed");
        var networkDataReceived = false;

        fetch(url)
            .catch(function(err){
            console.log(err);
            });
    }, 20000);
}
periodicFetch();



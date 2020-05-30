var $rangeLightIntensity = $(".js-range-slider-lightIntensity"),
    $inputFromLightIntensity = $(".js-input-from-lightIntensity"),
    instanceLightIntensity,
    minLightIntensity = 0,  //range min du slider
    maxLightIntensity = 100,   //range max du slider
    fromLightIntensity = minLightIntensity, // variable qui stock la valeur from du slider
    toLightIntensity = maxLightIntensity; // variable qui stock la valeur to du slider
//function sendData() {
//     fetch('https://pogotron-646fd.firebaseio.com/parametre.json', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             id: new Date().toISOString(),
//             min_temperature: from,
//             max_temperature: to
//         })
//     })
//         .then(function(res) {
//             console.log('Sent data', res);
//         })
//         .catch(function(err){
//             console.log("Failed to send data",err);
//         })
// }
$rangeLightIntensity.ionRangeSlider({
    skin: "round",
    min: minLightIntensity,   //range min
    max: maxLightIntensity,   //range max
    from: maxLightIntensity,  //def initial
    step: 0.1,  //graduation
    onStart: updateInputsLightIntensity,
    onChange: updateInputsLightIntensity,

    onFinish: function (data) {
        console.log("From : " + data.from);
        console.log("To : " + data.to);
    }
});

instanceLightIntensity = $rangeLightIntensity.data("ionRangeSlider");

function updateInputsLightIntensity (data) {
    fromLightIntensity = data.from

    $inputFromLightIntensity.prop("value", fromLightIntensity);
}

$inputFromLightIntensity.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < minLightIntensity) {
        val = minLightIntensity;
    } else if (val > toLightIntensity) {
        val = toLightIntensity;
    }

    instanceLightIntensity.update({
        from: val
    });
    from = parseFloat(val);
});


//submission function
//function executeData () {
//     alert("from : "+ from+" to : "+to  );
//
//     if ('serviceWorker' in navigator && 'SyncManager' in window) {
//         navigator.serviceWorker.ready
//             .then(function(sw) {
//                 var post = {
//                     id: "temperature",//new Date().toISOString(),
//                     min_temperature: from,
//                     max_temperature: to
//                 };
//                 writeData('sync-parameters', post)
//                     .then(function() {
//                         return sw.sync.register('sync-new-parameters');
//                     })
//                     .catch(function(err) {
//                         console.log(err);
//                     });
//             });
//     } else {
//         sendData();
//         console.log("FAILED");
//     }
// }
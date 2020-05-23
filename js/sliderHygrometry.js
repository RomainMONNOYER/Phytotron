var $rangeHygrometry = $(".js-range-slider-hygrometry"),
    $inputFromHygrometry = $(".js-input-from-hygrometry"),
    $inputToHygrometry = $(".js-input-to-hygrometry"),
    instanceHygrometry,
    minHygrometry = -50,  //range min du slider
    maxHygrometry = 50,   //range max du slider
    fromHygrometry = minHygrometry, // variable qui stock la valeur from du slider
    toHygrometry = maxHygrometry; // variable qui stock la valeur to du slider
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
$rangeHygrometry.ionRangeSlider({
    skin: "round",
    type: "double",
    min: minHygrometry,   //range min
    max: maxHygrometry,   //range max
    from: minHygrometry,  //def initial
    to: maxHygrometry,    //def initial
    step: 0.1,  //graduation
    onStart: updateInputsHygrometry,
    onChange: updateInputsHygrometry,

    onFinish: function (data) {
        console.log("From : " + data.from);
        console.log("To : " + data.to);
    }
});

instanceHygrometry = $rangeHygrometry.data("ionRangeSlider");

function updateInputsHygrometry (data) {
    fromHygrometry = data.from;
    toHygrometry = data.to;

    $inputFromHygrometry.prop("value", fromHygrometry);
    $inputToHygrometry.prop("value", toHygrometry);
}

$inputFromHygrometry.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < minHygrometry) {
        val = minHygrometry;
    } else if (val > toHygrometry) {
        val = toHygrometry;
    }

    instanceHygrometry.update({
        from: val
    });
    fromHygrometry = parseFloat(val);
});

$inputToHygrometry.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < fromHygrometry) {
        val = fromHygrometry;
    } else if (val > maxHygrometry) {
        val = maxHygrometry;
    }

    instanceHygrometry.update({
        to: val
    });
    toHygrometry=parseFloat(val);
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
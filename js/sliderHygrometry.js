var $rangeHygrometry = $(".js-range-slider-hygrometry"),
    $inputFrom = $(".js-input-from-hygrometry"),
    $inputTo = $(".js-input-to-hygrometry"),
    instance,
    min = -50,  //range min du slider
    max = 50,   //range max du slider
    from = min, // variable qui stock la valeur from du slider
    to = max; // variable qui stock la valeur to du slider
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
    min: min,   //range min
    max: max,   //range max
    from: min,  //def initial
    to: max,    //def initial
    step: 0.1,  //graduation
    onStart: updateInputs,
    onChange: updateInputs,

    onFinish: function (data) {
        console.log("From : " + data.from);
        console.log("To : " + data.to);
    }
});

instance = $rangeHygrometry.data("ionRangeSlider");

function updateInputs (data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
}

$inputFrom.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }

    instance.update({
        from: val
    });
    from = parseFloat(val);
});

$inputTo.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }

    instance.update({
        to: val
    });
    to=parseFloat(val);
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
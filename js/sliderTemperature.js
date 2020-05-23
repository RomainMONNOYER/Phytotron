var $range = $(".js-range-slider-temperature"),
    $inputFrom = $(".js-input-from-temperature"),
    $inputTo = $(".js-input-to-temperature"),
    instance,
    minTemperature=-50,  //range min du slider
    maxTemperature = 50,   //range max du slider
    fromTemperature = minTemperature, // variable qui stock la valeur from du slider
    toTemperature = maxTemperature; // variable qui stock la valeur to du slider
function sendData() {
    fetch('https://pogotron-646fd.firebaseio.com/parametre.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: new Date().toISOString(),
            min_temperature: from,
            max_temperature: to
        })
    })
        .then(function(res) {
            console.log('Sent data', res);
        })
        .catch(function(err){
            console.log("Failed to send data",err);
        })
}

$range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: minTemperature,   //range min
    max: maxTemperature,   //range max
    from: minTemperature,  //def initial
    to: maxTemperature,    //def initial
    step: 0.1,  //graduation
    onStart: updateInputs,
    onChange: updateInputs,

    onFinish: function (data) {
        console.log("From : " + data.from);
        console.log("To : " + data.to);
    }
});

instance = $range.data("ionRangeSlider");

function updateInputs (data) {
    fromTemperature = data.from;
    toTemperature = data.to;

    $inputFrom.prop("value", fromTemperature);
    $inputTo.prop("value", toTemperature);
}

$inputFrom.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < minTemperature) {
        val = minTemperature;
    } else if (val > toTemperature) {
        val = toTemperature;
    }

    instance.update({
        from: val
    });
    from = parseFloat(val);
});

$inputTo.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < fromTemperature) {
        val = fromTemperature;
    } else if (val > maxTemperature) {
        val = maxTemperature;
    }

    instance.update({
        to: val
    });
    to=parseFloat(val);
});

//submission function
function executeData () {
    alert("from : "+ fromTemperature+" to : "+toTemperature  );

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready
            .then(function(sw) {
                var post = {
                    id: "temperature",//new Date().toISOString(),
                    min_temperature: fromTemperature,
                    max_temperature: toTemperature
                };
                writeData('sync-parameters', post)
                    .then(function() {
                        return sw.sync.register('sync-new-parameters');
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
    } else {
        sendData();
        console.log("FAILED");
    }
}
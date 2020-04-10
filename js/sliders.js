var $range = $(".js-range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = -50,
    max = 50,
    from = 0,
    to = 0;
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
    min: min,
    max: max,
    from: min,
    to: max,
    step: 0.1,
    onStart: updateInputs,
    onChange: updateInputs,

    onFinish: function (data) {
        console.log("From : " + data.from);
        console.log("To : " + data.to);
        // fired on changing slider with Update method
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            navigator.serviceWorker.ready
                .then(function(sw) {
                    var post = {
                        id: new Date().toISOString(),
                        min_temperature: from,
                        max_temperature: to
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
});
instance = $range.data("ionRangeSlider");

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
});
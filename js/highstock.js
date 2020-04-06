// Create the chart
Highcharts.stockChart('temperature', {
    //chart: {
    //         events: {
    //             load: function () {
    //
    //                 // set up the updating of the chart each second
    //                 var series = this.series[0];
    //                 setInterval(function () {
    //                     var x = (new Date()).getTime(), // current time
    //                         y = Math.round(Math.random() * 100);
    //                     series.addPoint([x, y], true, true);
    //                 }, 1000);
    //             }
    //         }
    //     },

    rangeSelector: {
        buttons: [
            {
                count: 1,
                type: 'minute',
                text: '1M'
            },
            {
                count: 5,
                type: 'minute',
                text: '5M'
            },{
                count: 10,
                type: 'minute',
                text: '10M'
            },{
                count: 1,
                type: 'hour',
                text: '1H'
            }, {
                count: 1,
                type: 'day',
                text: '1D'
            },
            {
                count: 7,
                type: 'day',
                text: '1W'
            },{
                type: 'all',
                text: 'All'
            }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Temperature'
    },
    xAxis:{
        title:{
            text:'Date'
        }
    },
    yAxis:[{
        title:{
            text:'Temperature'
        },
        labels: {
            formatter: function() {
                return this.value + ' °C';
            }
        },
    }],

    exporting: {
        enabled: true
    },

    data: {
        //rowsURL: "https://demo-live-data.highcharts.com/time-rows.json",
        csvURL:"https://demo-live-data.highcharts.com/vs-load.csv",
        enablePolling: true,
        dataRefreshRate: 1
    }
});

Highcharts.stockChart('hygrometrie', {
    //chart: {
    //         events: {
    //             load: function () {
    //
    //                 // set up the updating of the chart each second
    //                 var series = this.series[0];
    //                 setInterval(function () {
    //                     var x = (new Date()).getTime(), // current time
    //                         y = Math.round(Math.random() * 100);
    //                     series.addPoint([x, y], true, true);
    //                 }, 1000);
    //             }
    //         }
    //     },

    rangeSelector: {
        buttons: [
            {
                count: 1,
                type: 'minute',
                text: '1M'
            },
            {
                count: 5,
                type: 'minute',
                text: '5M'
            },{
                count: 10,
                type: 'minute',
                text: '10M'
            },{
                count: 1,
                type: 'hour',
                text: '1H'
            }, {
                count: 1,
                type: 'day',
                text: '1D'
            },
            {
                count: 7,
                type: 'day',
                text: '1W'
            },{
                type: 'all',
                text: 'All'
            }],
        inputEnabled: false,
        selected: 0
    },

    xAxis:{
        title:{
            text:'Date'
        }
    },
    yAxis:[{
        title:{
            text:'Humidity'
        },
        labels: {
            formatter: function() {
                return this.value + '%';
            }
        },
    }],

    title: {
        text: 'Hygrometry'
    },

    exporting: {
        enabled: true
    },

    data: {
        //rowsURL: "https://demo-live-data.highcharts.com/time-rows.json",
        csvURL:"https://demo-live-data.highcharts.com/vs-load.csv",
        enablePolling: true,
        dataRefreshRate: 1
    }
});

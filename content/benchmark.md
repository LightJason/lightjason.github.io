---
title: "Benchmark"
draft: true
---

<div style="display: table; width: 100%;">
    <div style="display: table-row;">
        <div style="display: table-cell; width: 50%;"><canvas id="executiontime" /></div>
        <div style="display: table-cell; width: 50%;"><canvas id="agentinitializetime" /></div>
    </div>
    <div style="display: table-row;">
        <div style="display: table-cell;"><canvas id="memoryconsumption" /></div>
    </div>
</div>

<script>
// http://bootstrap-table.wenzhixin.net.cn/getting-started/

const timescaling = function(t) { return t / 1000000 };
const memoryscaling = function(m) { return m / Math.pow(1024, 2); };
const timebyloggingrate = function(t,r) { return t * r / 1000; };

const timeplot = function( id, frame, title, inputdata, yticklabel ) {
    new Chart(jQuery( "#" + id ), {
        type: "line",
        data: {
            labels: inputdata.scenariosize.map( n => Object.values(n).reduce((x, y) => x + y, 0) ),
            datasets: [{
                label: "mean time",
                data: inputdata.time[frame].map(n => timescaling(n.mean) ),
                fill: false,
                borderColor: [
                    "rgba(125,125,255,1)",
                ],
                borderWidth: 3
            },{
                label: "maximum time",
                data: inputdata.time[frame].map(n => timescaling(n.max) ),
                fill: false,
                borderColor: [
                    "rgba(255,100,135,1)",
                ],
                borderWidth: 2
            },{
                label: "minimum time",
                data: inputdata.time[frame].map(n => timescaling(n.min) ),
                fill: false,
                borderColor: [
                    "rgba(50,200,75,1)",
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title
            },
            legend: {
                position: "bottom"
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "number of agents"
                    },
                }],
                yAxes: [{
                    type: "logarithmic",
                    scaleLabel: {
                        display: true,
                        labelString: "time in miliseconds"
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: yticklabel || function(v, i) { return i % 3 ? "" : v.toFixed(2); }
                    }
                }]
            }
        }
    });
};

const memoryplot = function( id, title, inputdata, yticklabel ) {
    new Chart(jQuery( "#" + id ), {
        type: "line",
        data: {
            labels: Array.from(Array(inputdata.memory.totalmemory.length).keys()).map( n => timebyloggingrate(n, inputdata.configuration.memoryloggingrate).toFixed(0) ),
            datasets: [{
                label: "used memory",
                steppedLine: true,
                radius: 0,
                data: inputdata.memory.usedmemory.map( n => memoryscaling(n) ),
                fill: false,
                borderColor: [
                    "rgba(125,125,255,1)",
                ],
                borderWidth: 2
            },{
                label: "total memory",
                steppedLine: true,
                radius: 0,
                data: inputdata.memory.totalmemory.map( n => memoryscaling(n) ),
                fill: false,
                borderColor: [
                    "rgba(255,100,135,1)",
                ],
                borderWidth: 2
            },{
                label: "free memory",
                steppedLine: true,
                radius: 0,
                data: inputdata.memory.freememory.map( n => memoryscaling(n) ),
                fill: false,
                borderColor: [
                    "rgba(50,200,75,1)",
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title
            },
            legend: {
                position: "bottom"
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "benchmarking time in seconds"
                    },
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "memory in megabytes"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};




jQuery.ajax({
        url: "/synchronizedcount5.json",
        crossDomain: true
    })
    .done(function(data) {
        console.log(data);

        timeplot( "executiontime", "execution", "Agent Execution Time", data );
        timeplot( "agentinitializetime", "agentinitialize", "Agent Initializing Time", data );
        memoryplot( "memoryconsumption", "Memory Consumption", data );
    });    
</script>

---
title: "Benchmark"
draft: true
---

<div><canvas id="executiontime" /></div>
<div><canvas id="agentinitializetime" /></div>
<div><canvas id="memoryconsumption" /></div>

<script>
const timescaling = function(t) { return t / 1000000 };
const memoryscaling = function(m) { return m / Math.pow(1024, 2); };
const timebyloggingrate = function(t,r) { return t * r / 1000; };

const timeplot = function( id, frame, title, legend, inputdata ) {
        new Chart(jQuery( "#" + id ), {
            type: "line",
            data: {
                labels: inputdata.scenariosize.map( n => Object.values(n).reduce((x, y) => x + y, 0) ),
                datasets: [{
                    label: "mean " + legend + " time",
                    data: inputdata.time[frame].map(n => timescaling(n.mean) ),
                    fill: false,
                    borderColor: [
                        "rgba(125,125,255,1)",
                    ],
                    borderWidth: 3
                },{
                    label: "maximum " + legend + " time",
                    data: inputdata.time[frame].map(n => timescaling(n.max) ),
                    fill: false,
                    borderColor: [
                        "rgba(255,100,135,1)",
                    ],
                    borderWidth: 2
                },{
                    label: "minimum " + legend + " time",
                    data: inputdata.time[frame].map(n => timescaling(n.min) ),
                    fill: false,
                    borderColor: [
                        "rgba(50,200,75,1)",
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        type: "logarithmic",
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

        timeplot( "executiontime", "execution", "Agent Execution Time", "execution", data );
        timeplot( "agentinitializetime", "agentinitialize", "Agent Initializing Time", "initializing", data );




/*        
        // initializing time
bb.generate({
            bindto: "#initialzingtime",
            zoom: {
                enabled: true
            },
            data: {
                columns: [
                    ["mean initializing time"].concat(data.time.agentinitialize.map(function(n) {
                        return Math.log10( timescaling(n.mean) );
                    })), ["max initializing time"].concat(data.time.agentinitialize.map(function(n) {
                        return Math.log10( timescaling(n.max) );
                    })), ["min initializing time"].concat(data.time.agentinitialize.map(function(n) {
                        return Math.log10( timescaling(n.max) );
                    }))
                ]
            },
            axis: {
                x: {
                    label: {
                        text: "number of agents",
                        position: "outer-center"
                    },
                    tick: {
                        format: function(n) {
                            return data.scenariosize.map(function(n) {
                                return Object.values(n).reduce((x, y) => x + y, 0);
                            })[n];
                        }
                    }
                },
                y: {
                    label: {
                        text: "agent initialize in milliseconds",
                        position: "outer-middle"
                    },
                    tick: {
                        format: function(n) {
                            return (Math.pow(10, n) / 1000000).toFixed(2);
                        }
                    }
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            }
        });
        

        // memory consumption
        bb.generate({
            bindto: "#memoryconsumption",
            zoom: {
                enabled: true
            },
            data: {
                columns: [
                    ["used memory"].concat(data.memory.usedmemory), ["free memory"].concat(data.memory.freememory), ["total memory"].concat(data.memory.totalmemory)
                ]
            },
            axis: {
                x: {
                    label: {
                        text: "benchmarking time in seconds",
                        position: "outer-center"
                    },
                    tick: {
                        format: function(n) {
                            return timebyloggingrate(n, data.configuration.memoryloggingrate).toFixed(2);
                        }
                    }
                },
                y: {
                    label: {
                        text: "size in megabyte",
                        position: "outer-middle"
                    },
                    tick: {
                        format: function(n) {
                            return memoryscaling(n).toFixed(2);
                        }
                    }
                }
            },
            types: {
                "used memory": "step",
                "free memory": "step",
                "total memory": "step"
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            }

        });
        */
    });
</script>

---
title: "Benchmark"
draft: true
---

<p>
    <div id="configuration"></div>
</p>
<br/>
<p>
    <div style="display: table; width: 100%;">
        <div style="display: table-row;">
            <div style="display: table-cell; width: 50%;"><canvas id="executiontime" /></div>
            <div style="display: table-cell; width: 50%;"><canvas id="agentinitializetime" /></div>
        </div>
        <div style="display: table-row;">
            <div style="display: table-cell; width: 50%"><canvas id="executiondistribution" /></div>    
            <div style="display: table-cell; width: 50%"><canvas id="memoryconsumption" /></div>
        </div>
    </div>
</p>    

<script>
// http://bootstrap-table.wenzhixin.net.cn/getting-started/
// https://github.com/datavisyn/chartjs-chart-boxplot

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

const configurationtable = function( id, inputdata ) {
    const l_runtimdata = inputdata.configuration.runtime.split( " " );

    jQuery( "#" + id ).append(
        jQuery( "<table>" )
            .append( 
                jQuery( "<tr>" ).append( jQuery( "<th colspan=\"4\">" ).text( "Benchmark Configuration" ) )
             )
            .append(
                jQuery("<tr>")
                    .append( jQuery( "<th>" ).text( "Operating System" ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.osname ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.osversion ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.osarchitecture ) )
            )
            .append(
                jQuery( "<tr>" )
                    .append( jQuery( "<th>" ).text( "Java System" ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.vmvendor ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.vmname ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.javaversion + " (" + inputdata.configuration.vmversion + ")" ) )
            )
            .append(  
                jQuery( "<tr>" )
                    .append( jQuery( "<th>" ).text( "Machine Processors" ) )
                    .append( jQuery( "<td colspan=\"3\">" ).text( inputdata.configuration.processors ) ) 
            )
            .append(
                l_runtimdata[0].includes("synchronized")
                    ? jQuery( "<tr>" )
                        .append( jQuery( "<th>" ).text( "Runtime" ) )
                        .append( jQuery( "<td colspan=\"3\">" ).text( l_runtimdata[0] ) )
                    : jQuery( "<tr>" )
                        .append( jQuery( "<th>" ).text( "Runtime / Threadnumber" ) )
                        .append( jQuery( "<td colspan=\"1\">" ).text( l_runtimdata[0] ) )
                        .append( jQuery( "<td colspan=\"2\">" ).text( l_runtimdata[1] ) )       
            )
            .append(  
                jQuery( "<tr>" )
                    .append( jQuery( "<th>" ).text( "Iteration / Warm-Up / Execution" ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.iteration ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.warmup ) )
                    .append( jQuery( "<td>" ).text( inputdata.configuration.runs ) )
            )         
    );
};




jQuery.ajax({
        url: "/synchronizedcount5.json",
        crossDomain: true
    })
    .done(function(data) {
        console.log(data);

        configurationtable( "configuration", data );
        timeplot( "executiontime", "execution", "Agent Execution Time", data );
        timeplot( "agentinitializetime", "agentinitialize", "Agent Initializing Time", data );
        memoryplot( "memoryconsumption", "Memory Consumption", data );
    });    
</script>

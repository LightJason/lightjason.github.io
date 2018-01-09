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
            <div style="display: table-cell; width: 50%"><canvas id="cycletimedistribution" /></div>    
            <div style="display: table-cell; width: 50%"><canvas id="memoryconsumption" /></div>
        </div>
    </div>
</p>    

<script>
jQuery.ajax({
        url: "/synchronizedcount5.json",
        crossDomain: true
    })
    .done(function(data) {
        console.log(data);

        benchmark.configurationtable( "#configuration", data );
        benchmark.timeplot( "#executiontime", "execution", "agent execution time", data );
        benchmark.timeplot( "#agentinitializetime", "agentinitialize", "agent initializing time", data );
        benchmark.cycleplot( "#cycletimedistribution", "agent cycle time distribution", data );
        benchmark.memoryplot( "#memoryconsumption", "memory consumption", data );
    });    
</script>

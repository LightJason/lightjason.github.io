---
title: "Benchmark"
draft: true
---

<div id="executiontime"></div>
<div id="memoryconsumption"></div>

<script>
jQuery.ajax({
        url: "/synchronizedcount5.json",
        crossDomain: true
    })
    .done(function(i) {
        console.log(i);

        // execution time
        bb.generate({
            bindto: "#executiontime",
            zoom: {
                enabled: true
            },
            data: {
                columns: [
                    ["mean execution time"].concat(i.time.execution.filter(function(n) {
                        return n;
                    }).map(function(n) {
                        return Math.log10(n.mean);
                    })), ["max execution time"].concat(i.time.execution.filter(function(n) {
                        return n;
                    }).map(function(n) {
                        return Math.log10(n.max);
                    })), ["min execution time"].concat(i.time.execution.filter(function(n) {
                        return n;
                    }).map(function(n) {
                        return Math.log10(n.max);
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
                            return i.scenariosize.map(function(n) {
                                return Object.values(n).reduce((x, y) => x + y, 0);
                            })[n];
                        }
                    }
                },
                y: {
                    label: {
                        text: "seconds",
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
                    ["used memory"].concat(i.memory.usedmemory), ["free memory"].concat(i.memory.freememory), ["total memory"].concat(i.memory.totalmemory)
                ]
            },
            axis: {
                x: {
                    label: {
                        text: "simulation time in minutes",
                        position: "outer-center"
                    },
                    tick: {
                        // missing
                    }
                },
                y: {
                    label: {
                        text: "size in megabyte",
                        position: "outer-middle"
                    },
                    tick: {
                        format: function(n) {
                            return (n / Math.pow(1024, 2)).toFixed(2);
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
    });
</script>

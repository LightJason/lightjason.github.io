---
title: "Benchmark"
draft: true
---

## Minimal Counting Benchmark
{{< benchmark id="foo" url="/synchronizedcount5.json" >}}
Thie minimal benchmark runs a set of agents, which are counting down from 5 to 0. We are following the paper / report [Scalable Multi-Agent Simulation based
on MapReduce](https://www.in.tu-clausthal.de/fileadmin/homes/techreports/ifi1603ahlbrecht.pdf) of this example, but we are don't using any scalibility technologies
like [Map & Reduce](https://en.wikipedia.org/wiki/MapReduce). For the runtime behaviour a _synchronized_ version is used for comparing to the report benchmark, so
all agents are running in parallel until all agents has been finished their cycle, after that the next cycle begins. 
{{< /benchmark >}}
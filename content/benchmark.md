---
title: "Benchmark"
previous :
    url: "/framework"
    text: "framework"
next :
    url: "/knowledgebase"
    text: "knowledge base"
---

The listed benchmarks depends on the [benchmarking framework](https://github.com/LightJason/Benchmark) and a [benchmark docker container](https://hub.docker.com/r/lightjason/benchmark/)
which is run on [CircleCI](http://circleci.com).  A strict definition of the CircleCI Docker environment is the number of CPU and the memory size (see [CircleCI documentation](https://circleci.com/docs/2.0/configuration-reference/#resource_class) for default configuration), so we must define our benchmarking scnearios with maximum 2 CPUs and 4GB RAM.
But this helps us to reduce the complexity of the scenarios to a very small and straight definition without any superfluous content. Each run produces a JSON file with the raw data
and the main informations about the scenario / machine are shown within the table, a short introduction of the scenario content is also given.


## Minimal Counting Benchmark
{{< benchmark id="synchronizedcount5" user="LightJason" repo="Benchmark" >}}
Thie minimal benchmark runs a set of agents, which are counting down from 5 to 0. We are following the paper / report [Scalable Multi-Agent Simulation based
on MapReduce](https://www.in.tu-clausthal.de/fileadmin/homes/techreports/ifi1603ahlbrecht.pdf) of this example, but we are don't using any scalibility technologies
like [Map & Reduce](https://en.wikipedia.org/wiki/MapReduce). For the runtime behaviour a _synchronized_ version is used for comparing to the report benchmark, so
all agents are running in parallel until all agents has been finished their cycle, after that the next cycle begins. The warm-up phase used the first 5 cycles and
each run will be executed 3 times. 16 different agent sets will be executed, we try to build a more logarithm increase of the agent number.

The memory comsumption shows a stable structure during runtime but the Java runtime consumes around 3.5GB memory at maximum, so increasing the number of agents is not possible before the machine limit is reached. The execution and initializing time are strict increasing as expected. An interesting result of the benchmark is the _agent cycle distribution_ which shows the time of a cycle. Based on the results we can see that the minimum time of a cycle is near to zero but the length of the minimum whisker (line under the box) will increase based on increasing the number of agents. So a lot of agents are ideling during runtime (no plan will be executed, because the agents are finished). On this result we think that the scenarion - all agents count down from 5 to 0 - is not complex enough for a good benchmark analysis. With 5 agents on the scenario there is a similar number of agents which are idling and which are running. {{< /benchmark >}}

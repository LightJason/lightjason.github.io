---
title: "Benchmark"
previous :
    url: "/framework"
    text: "Framework"
next :
    url: "/knowledgebase"
    text: "Knowledge Base"
---

In the following, we present a benchmark we conducted to show a) how well LightJason performs on doing agent-related tasks and b) how it compares with similar platforms. 
<!--more-->

The benchmark depends on the [benchmarking framework](https://github.com/LightJason/Benchmark) and a [benchmark docker container](https://hub.docker.com/r/lightjason/benchmark/) which is run on [CircleCI](http://circleci.com). A strict definition of the CircleCI Docker environment is the number of CPUs and the memory size (see [CircleCI documentation](https://circleci.com/docs/2.0/configuration-reference/#resource_class) for default configuration), so we must define our benchmarking scenarios with maximum 2 CPUs and 4GB RAM. But this helps us to reduce the complexity of the scenarios to a very small and straight definition without any superfluous content. Each run produces a JSON file with the raw data and the main information about the scenario / machine is shown within the table, a short introduction of the scenario content is also given.


## Minimal Counting Benchmark
{{< benchmark id="synchronizedcount5" user="LightJason" repo="Benchmark" >}}
The minimal benchmark runs a set of agents, which are counting down from 5 to 0. We are following the paper / report [Scalable Multi-Agent Simulation based
on MapReduce](https://www.in.tu-clausthal.de/fileadmin/homes/techreports/ifi1603ahlbrecht.pdf) of this example, but we are not using any scalability technologies
like [Map & Reduce](https://en.wikipedia.org/wiki/MapReduce). For the runtime behaviour a _synchronised_ version is used for comparing to the report benchmark, so
all agents are running in parallel until all agents have finished their cycle. After that, the next cycle begins. The warm-up phase uses the first 5 cycles and
each run is executed 3 times, 16 different agent sets are executed. 

The memory consumption shows a stable structure during runtime but the Java runtime consumes around 3.5GB memory at maximum, so increasing the number of agents is not possible before the machine limit is reached. The execution and initialising time are strictly increasing as expected. An interesting result of the benchmark is the _agent cycle distribution_ which shows the time of a cycle. Based on the results we can see that the minimum time of a cycle is near to zero but the length of the minimum whisker (line under the box) will increase based on increasing the number of agents. So a lot of agents are idling during runtime (no plan will be executed, because the agents are finished). Based on this result we think that the scenario - all agents count down from 5 to 0 - is not complex enough for a good benchmark analysis. With 5 agents in the scenario there is a similar number of agents which are idling and which are running. {{< /benchmark >}}

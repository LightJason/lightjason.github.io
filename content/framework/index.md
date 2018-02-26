---
title: "Framework"
previous :
    url: "/publications"
    text: "publications"
next :
    url: "/benchmark"
    text: "benchmark"
---

The multi-agent framework is split up into different parts. Each component is provided with separate documentation. In this section, we give an overview of all framework elements.<!--more--> The whole framework is published at [Maven Central](http://mvnrepository.com).

The source codes are written in Java (latest release version) with a defined syntax structure; all code documentation is created with [Doxygen](http://www.doxygen.org). We are also using unit testing and the [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/) developing model.


|  __Component__  | __Status__ | __Development & Results__ | __Description__ |
|:---------------:|:----------:|---------------------------|-----------------|
| [AgentSpeak(L++)](agentspeak) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/AgentSpeak.svg)](https://circleci.com/gh/LightJason/AgentSpeak) <br/> [![Coverage Status](https://img.shields.io/coveralls/github/LightJason/AgentSpeak.svg)](https://coveralls.io/github/LightJason/AgentSpeak?branch=master) <br/> [![Docker](https://img.shields.io/docker/build/lightjason/agentspeak.svg)](https://hub.docker.com/r/lightjason/agentspeak/) | The component has been deployed to [maven central](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22agentspeak%22%20g%3A%22org.lightjason%22) and in the _testing phase_ to increase the amount of test-cases and finding/fixing  bugs. All necessary elements exist and the core components are covered by tests. | This component defines the main agent structure. It contains the whole syntax and the base agent structure. It also supports agent generators and configuration to create sets of agents by ASL-files. Due to the interface structure, all elements can be redefined. |
| [REST](https://github.com/LightJason/REST) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/REST.svg)](https://circleci.com/gh/LightJason/REST) <br/> [![Coverage Status](https://img.shields.io/coveralls/github/LightJason/REST.svg)](https://coveralls.io/github/LightJason/REST?branch=master) <br/> [![Docker](https://img.shields.io/docker/build/lightjason/rest.svg)](https://hub.docker.com/r/lightjason/rest/) | The component is currently _under development_. The main functionality is implemented, but the system is not tested completely and some features are missing. | The [REST-API (ReSTful)](https://en.wikipedia.org/wiki/Representational_state_transfer) is a system to define communication over [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) for distributed systems. We are supporting such a REST-API to control sets of agents and agent generators. So the whole multi-agent simulation can be controlled via web interfaces based on a servlet container on a Java web server e.g. [GlassFish](https://en.wikipedia.org/wiki/GlassFish), [Jetty](https://en.wikipedia.org/wiki/Jetty_(web_server)) or [Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat) |
| [Benchmark](https://github.com/LightJason/Benchmark) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/Benchmark.svg)](https://circleci.com/gh/LightJason/Benchmark) | For results on how LightJason/AgentSpeak(L++) performs, see [&#8594; benchmark page](/benchmark) | This repository contains a _benchmarking suite_ for the LightJason multi-agent framework. We try to keep the structure of a [Java Microbenchmark Harness](http://openjdk.java.net/projects/code-tools/jmh/) and adapted for the structure of a multi-agent system. |
| [Examples](https://github.com/LightJason/Examples) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/Examples.svg)](https://circleci.com/gh/LightJason/Examples) | _Under development_ | Repository with the base structure of each LightJason AgentSpeak(L++) examples. The examples are presented and explained in the [tutorial section](http://lightjason.org/tutorials). |
| [Docker](https://github.com/LightJason/Docker) | ![Docker](https://img.shields.io/docker/build/lightjason/docker.svg) | _Stable_ | The LightJason Docker container is used for development and automating processes of LightJason. The container is split up into different sections with different build environments. |

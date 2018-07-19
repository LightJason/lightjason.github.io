---
title: "Framework"
previous :
    url: "/publications"
    text: "Publications"
next :
    url: "/benchmark"
    text: "Benchmark"
---

The multi-agent framework is split up into different parts. Each component is provided with separate documentation. In this section, we give an overview of all framework elements.<!--more--> The whole framework is published at [Maven Central](http://mvnrepository.com).

The source codes are written in Java (latest release version) with a defined syntax structure; all code documentation is created with [Doxygen](http://www.doxygen.org). We are also using unit testing and the [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/) developing model.


## AgentSpeak

|  __Component__  | __Status__ | __Development & Results__ | __Description__ |
|:---------------:|:----------:|---------------------------|-----------------|
| [{{< img src="/images/logo_asl.png" width="100px" >}} AgentSpeak(L++)](agentspeak) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/AgentSpeak-Java.svg)](https://circleci.com/gh/LightJason/AgentSpeak-Java) <br/> [![Coverage Status](https://img.shields.io/coveralls/github/LightJason/AgentSpeak-Java.svg)](https://coveralls.io/github/LightJason/AgentSpeak-Java?branch=master) <br/> [![Docker](https://img.shields.io/docker/build/lightjason/agentspeak.svg)](https://hub.docker.com/r/lightjason/agentspeak/) <br/> [![Maven Central](https://img.shields.io/maven-central/v/org.lightjason/agentspeak.svg)](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22agentspeak%22%20g%3A%22org.lightjason%22) <br/> ![status: testing](https://img.shields.io/badge/phase-testing-green.svg) | _[LightJason/AgentSpeak-Java](https://agentspeak-java.lightjason.org)_ has been deployed to [maven central](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22agentspeak%22%20g%3A%22org.lightjason%22) and is considered _stable_. It is currently in the _testing phase_ to increase the amount of test-cases and finding/fixing bugs. All necessary elements exist and the core components are covered by tests. | This component defines the main agent structure. It contains the whole syntax and the base agent structure. It also supports agent generators and configuration to create sets of agents by ASL files. Due to the interface structure, all elements can be redefined. |


## Demonstration

|  __Component__  | __Status__ | __Development & Results__ | __Description__ |
|:---------------:|:----------:|---------------------------|-----------------|
| [Examples](https://github.com/LightJason/Examples) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/Examples.svg)](https://circleci.com/gh/LightJason/Examples) <br/> ![status: under development](https://img.shields.io/badge/phase-under_development-yellow.svg) | _LightJason/Examples_ is _under development_ to always present working examples for tutorials and knowledge base articles. | Repository with the base structure of each LightJason AgentSpeak(L++) examples. The examples are presented and explained in the [tutorial section](https://lightjason.org/tutorials). |
| [Benchmark](https://github.com/LightJason/Benchmark) | [![CircleCI](https://img.shields.io/circleci/project/github/LightJason/Benchmark.svg)](https://circleci.com/gh/LightJason/Benchmark) | _LightJason/Benchmark_ demonstrates the scalability and performance of LightJason/AgentSpeak(L++). See [&#8594; benchmark page](/benchmark) for details. | This repository contains a _benchmarking suite_ for the LightJason multi-agent framework. We try to keep the structure of a [Java Microbenchmark Harness](http://openjdk.java.net/projects/code-tools/jmh/) and adapted for the structure of a multi-agent system. |

## Automation Toolchain
 
|  __Component__  | __Status__ | __Development & Results__ | __Description__ |
|:---------------:|:----------:|---------------------------|-----------------|
| [Docker](https://github.com/LightJason/Docker) | ![Docker](https://img.shields.io/docker/build/lightjason/docker.svg) <br/> ![status: stable](https://img.shields.io/badge/phase-stable-brightgreen.svg) | _LightJason/Docker_ is considered _stable_ and provides a working build and testing environment. | The LightJason Docker container is used for development and automating processes of LightJason. The container is split up into different sections with different build environments. |

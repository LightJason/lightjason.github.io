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


|  __Component__  | __Status__ | __Development__ | __Description__ |
|:---------------:|:----------:|-----------------|-----------------|
| [AgentSpeak(L++)](agentspeak) | [![CircleCI](https://circleci.com/gh/LightJason/AgentSpeak.svg?style=shield)](https://circleci.com/gh/LightJason/AgentSpeak) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/AgentSpeak/badge.svg?branch=master)](https://coveralls.io/github/LightJason/AgentSpeak?branch=master) | The component is before the first release, we are in the _testing phase_ and increase test-cases to find any problems, all necessary elements exist and are mainly tested | This component defines the main agent structure. It defines the whole syntax and the base agent structure. It also supports an agent generator and configuration so that you can create a set of agents by an ASL-file. Based on the interface structure, you can redefine all elements if you like. |
| [REST](https://github.com/LightJason/REST) | [![CircleCI](https://circleci.com/gh/LightJason/REST.svg?style=shield)](https://circleci.com/gh/LightJason/REST) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/REST/badge.svg?branch=master)](https://coveralls.io/github/LightJason/REST?branch=master) | The component is _currently under development_, the main functionality is implemented, but the system is not tested completely and some features can be missing  | The [REST-API (ReSTful)](https://en.wikipedia.org/wiki/Representational_state_transfer) is a system to define communication over [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) for distributed systems. We are supporting such a REST-API to control a set of agents and agent generators. So the whole multi-agent simulation can be controlled via a web interface based on a servlet container on a Java web server e.g. [GlassFish](https://en.wikipedia.org/wiki/GlassFish), [Jetty](https://en.wikipedia.org/wiki/Jetty_(web_server)) or [Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat) |
| [Scratchpad](https://github.com/LightJason/Scratchpad) | | The componentis started up, so at the moment the basic infrastructure will be build | The idea of a scratchpad depends on our [workshop](/news/2017-09-workshop/), hands-on [tutorials](/tutorials) and on our [wizard](/tutorials/wizard). We are building a high-scalibility cloud-based application of a multi-agent system with current state-of-the-art technologies like [Spring-Boot](https://projects.spring.io/spring-boot/), [Netflix Hysterix](https://github.com/Netflix/Hystrix) and [React](https://reactjs.org/) |
 

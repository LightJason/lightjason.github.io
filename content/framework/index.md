---
title: "Framework"
---

The multi-agent framework is split up into different parts. Each component has got its own documentation. At this section, we would like to give an overview over all elements within the framework. All frameworks are published to [Maven Central](http://mvnrepository.com).

The source codes are written in Java (latest release version) with a defined syntax structure and all code documentation will be created with [Doxygen](http://www.doxygen.org). We are also using unit testing and the [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/) developing model.



## AgentSpeak(L++) ![AgentSpeak(L++)](https://camo.githubusercontent.com/91d144939950611f83510276f546163e62f3f0f1/68747470733a2f2f636972636c6563692e636f6d2f67682f4c696768744a61736f6e2f4167656e74537065616b2e7376673f7374796c653d736869656c64)

This component defines the main agent structure. It defines the whole syntax and the base agent structure. It also supports an agent generator and configuration, so that you can create a set of agents by an ASL-file. Based on the interface structure, you can redefine all elements if you like. A full [railroad diagram](https://en.wikipedia.org/wiki/Syntax_diagram) of our _AgentSpeak(L++)_ syntax can be found on the feature page.


* [Testing Agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/complete.asl)
* [Agent](https://github.com/LightJason/AgentSpeak/blob/master/src/test/resources/agent/hanoi.asl) which plays [Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
* [Language Features](agentspeak)
* [Source Documentation](https://lightjason.github.io/AgentSpeak/sources/index.html)
* [OpenHub Code Statistic](https://www.openhub.net/p/LightJason-AgentSpeak)

## REST-API ![REST-API](https://camo.githubusercontent.com/a72dbacc13be27a0b87b8be9177f52180610b50f/68747470733a2f2f636972636c6563692e636f6d2f67682f4c696768744a61736f6e2f524553542e7376673f7374796c653d736869656c64)


A [REST-API (ReSTful)](https://en.wikipedia.org/wiki/Representational_state_transfer) is a system to define communication over [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) for distributed systems. We are supporting such a REST-API to control a set of agents which can be also grouped.

* [Source Documentation](https://lightjason.github.io/REST/sources/index.html)
* [OpenHub Code Statistic](https://www.openhub.net/p/LightJason-REST)

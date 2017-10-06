---
title: "Framework"
gitter: framework
previous :
    url: "/publications"
    text: "publications"
next :
    url: "/knowledgebase"
    text: "knowledge base"
---

The multi-agent framework is split up into different parts. Each component is provided with separate documentation. In this section, we give an overview of all framework elements. The whole framework is published to [Maven Central](http://mvnrepository.com).

The source codes are written in Java (latest release version) with a defined syntax structure; all code documentation is created with [Doxygen](http://www.doxygen.org). We are also using unit testing and the [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/) developing model.


|  __Component__  | __Status__ | __Development__ | __Description__ |
|:---------------:|:----------:|-----------------|-----------------|
| [AgentSpeak(L++)](agentspeak) | [![CircleCI](https://circleci.com/gh/LightJason/AgentSpeak.svg?style=shield)](https://circleci.com/gh/LightJason/AgentSpeak) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/AgentSpeak/badge.svg?branch=master)](https://coveralls.io/github/LightJason/AgentSpeak?branch=master) | The component is before the first release, we are in the _testing phase_ and increase test-cases to find any problem, all necessary elements are existing and mainly tested | This component defines the main agent structure. It defines the whole syntax and the base agent structure. It also supports an agent generator and configuration, so that you can create a set of agents by an ASL-file. Based on the interface structure, you can redefine all elements if you like. |
| [SocialForce](https://github.com/LightJason/SocialForce) | [![CircleCI](https://circleci.com/gh/LightJason/SocialForce.svg?style=shield)](https://circleci.com/gh/LightJason/SocialForce) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/SocialForce/badge.svg?branch=master)](https://coveralls.io/github/LightJason/SocialForce?branch=master) | Currently the first initialized code fragment without any working component| We extend with this component the [social force model](https://en.wikipedia.org/wiki/Social_force_model) of Dirk Helbing, to build a more abstract, efficient and generalized component for [crowd](https://en.wikipedia.org/wiki/Crowd_simulation) simulation. The main idea is to split the force into two components _mind-force_ and _physical-force_  |
| [Twill](https://github.com/LightJason/Twill) | [![CircleCI](https://circleci.com/gh/LightJason/Twill.svg?style=shield)](https://circleci.com/gh/LightJason/Twill) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/Twill/badge.svg?branch=master)](https://coveralls.io/github/LightJason/Twill?branch=master) | Currently the first idea of the framework component | Th components create a container to run any agent on a [Hadoop cluster system](https://en.wikipedia.org/wiki/Apache_Hadoop), we use [Apache Twill](http://twill.apache.org/) framework which based on [YARN](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html) |
| [REST](https://github.com/LightJason/REST) | [![CircleCI](https://circleci.com/gh/LightJason/REST.svg?style=shield)](https://circleci.com/gh/LightJason/REST) <br/> [![Coverage Status](https://coveralls.io/repos/github/LightJason/REST/badge.svg?branch=master)](https://coveralls.io/github/LightJason/REST?branch=master) | The component is in _current development_, the main functionality is implemented, but the system is not tested completely and some features can be missing  | The [REST-API (ReSTful)](https://en.wikipedia.org/wiki/Representational_state_transfer) is a system to define communication over [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) for distributed systems. We are supporting such a REST-API to control a set of agents and agent generators. So the whole multi-agent simulation can be controlled via a web interface based on a servlet container on a Java web server e.g. [GlassFish](https://en.wikipedia.org/wiki/GlassFish), [Jetty](https://en.wikipedia.org/wiki/Jetty_(web_server)) or [Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat) |

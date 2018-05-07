---
title: "REST Component"
---

{{< img src="/images/logo_rest.png" width="100px" class="#right" >}} _[LightJason/REST](https://rest.lightjason.org)_ is a component to control running LightJason agents via REST.

The [REST-API (ReSTful)](https://en.wikipedia.org/wiki/Representational_state_transfer) is an architectural style to define communication over [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) for distributed systems. We are supporting such a REST-API to control sets of agents and agent generators. So the whole multi-agent simulation can be controlled via web interfaces based on a servlet container on a Java web server e.g. [GlassFish](https://en.wikipedia.org/wiki/GlassFish), [Jetty](https://en.wikipedia.org/wiki/Jetty_(web_server)) or [Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat)

* [Source Documentation](https://rest.lightjason.org/sources/)
* [OpenHub Code Statistic](https://www.openhub.net/p/LightJason-REST)
* [Coveralls.io Statistic](https://coveralls.io/github/LightJason/REST)
* [Libraries.io Statistic](https://libraries.io/github/LightJason/REST)
* [Docker-Hub](https://hub.docker.com/r/lightjason/rest/)

</br>

**Supported URL Patterns**

* **Single Agent**
    * ```/agent/list``` (HTTP-GET) returns a list of all registered agent names
    * ```/agent/cycle``` (HTTP-GET) executes the cycle of all registered agents
    * ```/agent/<agent identifier>/cycle``` (HTTP-GET) executes the agent cycle
    * ```/agent/<agent identifier>/view``` (HTTP-GET) returns the current state of the agent
    * ```/agent/<agent identifier>/sleep?time=``` (HTTP-GET) pushs the agent into sleeping state for a defined time (time parameter is optional, if is not set the time is unlimited)
    * ```/agent/<agent identifier>/wakeup``` (HTTP-GET & POST) wakes the agent up from sleeping state and via post can be passed a semicolon / line-break list with literals as plain-text which are pushed into the wake-up goal
    * ```/agent/<agent identifier>/trigger/<action>/<type>``` (HTTP-POST) triggers a goal within the next cycle, the action can be ```add (+)``` or ```delete (-)``` and the type ```goal``` or ```belief```
    * ```/agent/<agent identifier>/trigger/<action>/<type>/immediately``` (HTTP-POST) triggers a goal immediately (equal to trigger-call)
    * ```/agent/<agent identifier>/belief/<action>``` (HTTP-POST) modifies the beliefbase with action ```add``` or ```delete``` and a literal which is passed by the post plain-text data
</br></br>
* **Groups of Agents**
    * ```/agentgroup/list``` (HTTP-GET)  list all groups with the names
    * ```/agentgroup/<group name>/list``` (HTTP-GET) list all agents within the group
    * ```/agentgroup/<group>/cycle``` (HTTP-GET) executes the agent cycle of a group
    * ```/agentgroup/<group>/sleep?time=``` (HTTP-GET) pushs the agent into sleeping state for a defined time (time parameter is optional, if is not set the time is unlimited)
    * ```/agentgroup/<group>/wakeup``` (HTTP-GET & POST) runs the wake-up call of all agents within a group (the post content data can contains literals seperated by semicolon or line-break)
    * ```/agentgroup/<group>/belief/<action>``` (HTTP-POST) modifies the beliefbase with action ```add``` or ```delete``` and a literal which is passed by the post plain-text data
    * ```/agentgroup/<group>/trigger/<action>/<type>``` (HTTP-POST) triggers a goal within the next cycle, the action can be ```add (+)``` or ```delete (-)``` and the type ```goal``` or ```belief```
    * ```/agentgroup/<group>/trigger/<action>/<type>/immediately``` (HTTP-POST) triggers a goal immediately (equal to trigger-call)
</br></br>
* **Agent Generators**
    * ```/agentgenerator/list``` (HTTP-GET)  list all generator
    * ```/agentgenerator/single``` (HTTP-GET) creates a single agent for all generators
    * ```/agentgenerator/multiple``` (HTTP-POST) creates multiple agent for all generators, the number is send as post plain data
    * ```/agentgenerator/<generator identifier>/single``` (HTTP-GET) creates a single agent for all generators
    * ```/agentgenerator/<generator identifier>/multiple``` (HTTP-POST) creates multiple agent for all generators, the number is send as post plain data
---
title: "LightJason: First Releases Published at Maven Central"
date: 2018-02-026T14:38:03+01:00
categories: ["Project"]
---

We are happy to announce that we just released our first packaged versions of [AgentSpeak(L++)](http://github.com/LightJason/AgentSpeak) and [REST](http://github.com/LightJason/REST) to [maven central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.lightjason%22).
<!--more-->

By creating releases of the two packages development with LightJason/AgentSpeak(L++) becomes even easier:
Instead of having to pre-build AgentSpeak and REST by hand and installing it to the local repository (i.e. running ```mvn package install```) it can now simply be added to the project's dependencies, e.g.

<!-- htmlmin:ignore -->
{{< githubsource user="LightJason" repo="Examples" branch="tutorial-agentspeak-in-15min" file="pom.xml" lang="xml" filter="[[:space:]]{12}<groupId>org\.lightjason</groupId>(.|\n)*?<artifactId>agentspeak</artifactId>(.|\n)*?</version>" prefix="<dependency>" postfix="</dependency>" >}}
<!-- htmlmin:ignore -->

Piece of cake.

With our switch towards releases we fully embrace the _git-flow_ paradigm (see [&#8594; A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/) for details), the [```master``` branch](https://github.com/LightJason/AgentSpeak/tree/master) now contains our current release version while ongoing development can be found in the [```developing``` branch](https://github.com/LightJason/AgentSpeak/tree/developing).

We also updated and simplified our tutorial [&#8594; Develop an AgentSpeak Scenario in 15 Minutes](/tutorials/agentspeak-in-fifteen-minutes) and added the new tutorial [&#8594; How to Build AgentSpeak from Source](/tutorials/buildagentspeak) to please developers who want to test _bleeding-edge_ features before they get incorporated into a stable release.

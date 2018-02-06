---
title: "EMAS 2014 - A scalable runtime platform for multiagent-based simulation"
---

> {{< printpublication id="Ahlbrecht2014emas" >}}

<!--more-->

In this publication, we present an architecture of a _scalable multi-agent framework_. This idea is based on the problem that all current frameworks are neither constructed for a large number of agents nor flexible enough to create a very detailed behaviour or add to an existing platform.

Based on this problem, we try to separate different elements of a multi-agent system:

* _Microkernel:_ The _execution_ of agents and the whole system. So it describes the runtime model of the system.
* _Agent-Model-Layer:_ The _abstraction of a runtime model_ so that we can define a multi-agent system with all elements e.g. agents, artefacts, norms, ...
* _Scenario-Model:_ The _top-level abstraction_ of the system, with all definitions of the scenario-depended elements e.g. in a traffic simulation for example points of interests

This first idea was a main goal of the architecture of [LightJason AgentSpeak(L++)](/framework), but the idea cannot transformed retrospectively into a source code architecture, because the _microkernel_ was an abstraction of another structure, but we defined this structure not within the paper. So LightJason goes one step back and starts up from scratch...

---
title: "Tutorial: Efficent Beliebase"
---
In contrast to Prolog and original Jason the beliefbase is more than a list. LightJason supports a hierarchical structure of beliefs. A literal in LightJason can be structure like

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo/name(5)
</code></pre>

and each part (seperated by slash) referenced a beliefbase. This structure is like a unix directory, where the last item is the file.

## Elements

The beliefbase consists of three different elements

* __Storage__ is a persistent thread-safe structure for the literals and views
* __Views__ are structured elements to build the hierarchical naming structure of the beliefbase
* __Beliefbase__ is a middelware between views and storage to create goal-trigger

### Persistence

In general beliefs can be stored in a persistence way. So an literal object will be set into the storage and the views creates the tree structure. 

![Beliefbase](/images/beliefbase.svg#centering)

For this example there are two agents and both agents referenced to the equal storage, but uses different views.

* Agent 1 get access to the literal bei the structure <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo/name(5)
</code></pre>

* Agent 2 get access to the literal bei the structure <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo2/name(5)
</code></pre>
 
This structure allows the agent to store knowledge in persistence way with generating the goals, but this type of beliefs needs memory and take performance on modification. On each cycle the storage can generate or delete beliefs which triggers the goals.
 
### On-Demand

The on-demand beliefbase allows you to create a non-persistence belief definition, which is suitable to get access to the environment / underlying software architecture. The beliefs will generate by access on after usage the literal object will be removed. So this is a very efficent way for perceiving.

---
title: "Tutorial: Efficent Beliebase"
---
In contrast to Prolog and original Jason the beliefbase is more than a list. LightJason supports a hierarchical structure of beliefs. A literal in LightJason can be structure like

<pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo/value(5)
</code></pre>

and each part (seperated by slash) referenced a beliefbase. This structure is like a unix directory, where the last item is the file (the literal).

## Elements

The beliefbase consists of three different elements

* __Storage__ is a persistent thread-safe structure for the literals and views
* __Views__ are structured elements to build the hierarchical naming structure of the literal
* __Beliefbase__ is a middelware between views and storage to create goal-trigger

### Persistence

In general beliefs can be stored in a persistence way. So an literal object will be set into the storage and the views creates the tree structure. 

![Beliefbase](/images/beliefbase.svg#centering)

For this example there are two agents and both agents referenced to the equal storage, but uses different views.

* Agent 1 get access to the literal bei the structure <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo/value(5)
</code></pre>

* Agent 2 get access to the literal bei the structure <pre data-language="AgentSpeak(L++)"><code class="language-agentspeak">
foo2/value(5)
</code></pre>
 
This structure allows the agent to store knowledge in persistence way with generating the goals, but this type of beliefs needs memory and take performance on modification. On each cycle the storage can generate or delete beliefs which triggers the goals.
 
### On-Demand

The on-demand beliefbase allows you to create a non-persistence belief definition, which is suitable to get access to the environment / underlying software architecture. 

![Beliefbase](/images/ondemandbeliefbase.svg#centering)

For some practical explanation. Think about agents:

> Agents are _individual and self-organized_ items, 
> which perceives their environment autonomous.

We build this structure with _on-demand beliefbases_ into LightJasn AgentSpeak(L++), so you can get access to a belief which will be create if you access it and after usage the literal object will be removed. So this is a very efficent way for perceiving. We recommand the following workflow: 

1. build a on-demand beliefbase for all dynamic access and changable information e.g. environment other agents
2. create a plan which will run in a continuous, so the plan will run in each cycle
3. within this plan you get access to the belief
4. if the belief can be unified within the plan condition get the information out of the belief and put it - if is needed - into a persistency beliefbase

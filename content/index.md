---
type: homepage
---
LightJason is a _lightwire multi-agent framework_ for creating a multi-agent systems with Java. The project is inspired by [AgentSpeak(L)](https://en.wikipedia.org/wiki/AgentSpeak) and  [Jason](http://jason.sourceforge.net), but designed and implemented from scratch.
LightJason is fine-tuned to concurrent plan execution suitable for distributed frameworks and aims at efficient and scalable integration with existing platforms.
To design agents, this framework uses AgentSpeak(L++), a modular extension of AgentSpeak(L), including new features, e.g.

* [lambda-expression](framework/agentspeak#lambdaexpression)
* [multi-plan / -rule definition](framework/agentspeak#multiplanrule)
* [explicit repair-action](framework/agentspeak#repairaction)
* [multi-variable assignments](framework/agentspeak#multiassignment)
* [parallel execution and thread-safe variables](framework/agentspeak#parallelization)

We are working on the theoretical background and developing the whole system with current software development technologies.

One of our main desire is, that we publish a full useable framework which can be used in _productive system_ and is understandable also for _non-computer scientists_. We trying to close the gap between modelling aspects, performance and scalability and also human-understandable clean written source codes

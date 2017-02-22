---
type: homepage
---

{{% gitter %}}

LightJason is a _concurrent BDI multi-agent framework_ for creating a multi-agent systems with Java. A [multi-agent system](https://en.wikipedia.org/wiki/Multi-agent_system) is part of the research of [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence). We try to create a framework which allows to add AI algorithms to an existing software-architecture. The framework combines classical artificial intelligence with optimization and [fuzzy-logical](https://en.wikipedia.org/wiki/Fuzzy_logic) concepts on a high-scalable concurrency architecture.

The project is inspired by [AgentSpeak(L)](https://en.wikipedia.org/wiki/AgentSpeak) and  [Jason](http://jason.sourceforge.net), but designed and implemented from scratch.
LightJason is fine-tuned to concurrent plan execution suitable for distributed frameworks and aims at efficient and scalable integration with existing platforms.
To design agents, this framework uses [AgentSpeak(L++)](http://lightjason.github.io/AgentSpeak/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm), a modular extension of AgentSpeak(L), including new features, e.g.

* [lambda-expression](framework/agentspeak#lambdaexpression)
* [multi-plan / -rule definition](framework/agentspeak#multiplanrule)
* [explicit repair-action](framework/agentspeak#repairaction)
* [multi-variable assignments](framework/agentspeak#multiassignment)
* [parallel execution and thread-safe variables](framework/agentspeak#parallelism)

We are working on the theoretical background and developing the whole system with current software development technologies.

One of our main desires is to publish a full useable framework which can be used in _productive systems_ and is understandable also for _non-computer scientists_. We try to close the gap between modelling aspects, performance and scalability and human-understandable clean written source code.

##### Feedback and User Contribution

We welcome any constructive feedback.
If you think there is anything missing or wish to contribute to our documentation feel free to [contact us](/contact).

You can

* talk with us and other community members at our [discussion board](https://gitter.im/LightJason)
* send us [pull requests](https://help.github.com/articles/about-pull-requests/) for contributing to our [repositories](https://github.com/LightJason/) with corrections and further input (preferably)
* create an [issue](https://github.com/LightJason/AgentSpeak/issues) or
* write us an [email](/contact).

---
type: homepage
next:
    url: "/publications"
    text: "Publications"
---

{{< img src="images/logo.png" width="100px" class="#left" >}}
LightJason is a _concurrent BDI multi-agent framework_ for creating multi-agent systems with Java.

[Multi-agent systems](https://en.wikipedia.org/wiki/Multi-agent_system) are generally considered a sub-discipline of [Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence). We try to create a framework which allows to add AI algorithms to an existing software architecture as a mainly _side-effect free_ programming language. The framework combines classical Artificial Intelligence methods with optimisation and [fuzzy-logics](https://en.wikipedia.org/wiki/Fuzzy_logic) concepts on a high-scalable concurrency architecture.

The project is inspired by [AgentSpeak(L)](https://en.wikipedia.org/wiki/AgentSpeak) and  [Jason](http://jason.sourceforge.net), but designed and implemented from scratch.
LightJason is fine-tuned to concurrent plan execution suitable for distributed computing environments and aims at efficient and scalable integration with existing platforms.
As a language to design agents, this framework uses [AgentSpeak(L++)](https://agentspeak.lightjason.org/rrd-output/html/org/lightjason/agentspeak/grammar/Agent.g4/index.htm), a modular extension of AgentSpeak(L), including new features, e.g.

* [lambda-expression](framework/agentspeak#lambdaexpression)
* [multi-plan / -rule definition](framework/agentspeak#multiplanrule)
* [explicit repair actions](framework/agentspeak#repairaction)
* [multi-variable assignments](framework/agentspeak#multiassignment)
* [parallel execution and thread-safe variables](framework/agentspeak#parallelism)

LightJason is developed by using state-of-the-art software development technologies.

One of our main objective is to publish a framework which can be used in _productive systems_ and is understandable also for _non-computer scientists_. We try to close the gap between modelling aspects, performance and scalability, and human-understandable cleanly written source code.

##### Feedback and User Contribution

We welcome any constructive feedback.
If you think there is anything missing or wish to contribute to our documentation feel free to [contact us](/contact).

You can

* talk to us and other community members at our [discussion board](https://gitter.im/LightJason)
* send us [pull requests](https://help.github.com/articles/about-pull-requests/) for contributing to our [repositories](https://github.com/LightJason/) with corrections and further input (preferably)
* create an [issue](https://github.com/LightJason/AgentSpeak/issues) or
* write us an [email](/contact).

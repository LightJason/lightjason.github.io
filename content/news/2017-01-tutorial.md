---
date: 2017-01-01T22:02:54+01:00
title: "Tutorial Update"
categories: ["Documentation"]
---
We update the tutorials with a short introduction in [efficient beliefbases](/tutorial/tutorial-efficient-beliefbase) and [communication](/tutorial/tutorial-communication) <!--more--> 

The [LightJason achitecture](/) allows you to create _on-demand beliefbases_ (which uses a [lazy loading](https://en.wikipedia.org/wiki/Lazy_loading)) structure. The beliefs within the beliefbase are generated during the agent gets access to the literal. This pattern is very fast and efficient.

The communication of [LightJason](/) does not define any build-in agent communication, so for each scenario you need to create your own communication structure. within the tutorial we show you a baseline example to implement communication.


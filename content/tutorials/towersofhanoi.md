---
title: "Example: Towers of Hanoi"
jsonld: ["techarticle", "course"]
draft: true
---

This example shows a single agent which plays [towers of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi). We have chosen this example because it illustrates the difference of _recursion_ and _iteration_ of problem solving. Additionally, we demonstrate in this tutorial the resilience of LightJason's agents.

<!--more-->

## Recursion versus iteration

The main aspect of our _solution algorithm_ is the [non-recursion algorithm](https://en.wikipedia.org/wiki/Tower_of_Hanoi#Non-recursive_solution). We use this because of the [data-streaming architecture](/knowledgebase/differencetojason) of LightJason agents. The agent runs cycle-wise and within each cycle we need to check if the slices are on the correct tower. We vsiualize this with a [finite-state-machine](/knowledgebase/finitestatemachine).

{{< img src="/images/towersofhanoi.svg" >}}

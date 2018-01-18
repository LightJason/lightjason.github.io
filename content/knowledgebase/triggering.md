---
title: "Advanced Knowledge: Plan Triggering Techniques"
jsonld: ["techarticle"]
gitter: "knowledge base"
previous :
    url: "/knowledgebase/multiassignments"
    text: "kb: Advanced - Multi-Assignments"
next :
    url: "/knowledgebase/annotations"
    text: "kb: Advanced - Plan and Rule Annotations"
---

{{< toc >}}

## `!` vs `!!`

The order of execution (parallel, sequential) of sub-[plans](../plans), triggered inside their parent plan differs depending on the trigger symbol `!` or `!!`:

<!--more-->

* The trigger `!planname` marks a plan `+!planname` to be executed in the **next** cycle &#8594; *postponed execution*.

> **Note:** Adding `!planname` multiple times in one cycle will result in `+!planname` to be executed only **once** in the next cycle because the same trigger gets only added once.

* In contrast, `!!planname` executes the matching plan in **this** (read: the same) cycle &#8594; *immediate execution*.
 
> **Note:** As every plan body is executed sequentially, for each given `!!planname` the plan `+!planname` will be executed in that sequence.<br>
> **For advanced users**: With the annotation `@parallel` a plan can be modified to execute all plan-body statements in parallel (see [&#8594; parallel annotations](/knowledgebase/annotations/#parallel)).

If the plan signature `+!planname` contains a variable `N`, e.g. `+!planname(N)`, multiple different instances of triggers will be created (one for each unique `N`).

## Examples

Consider the following AgentSpeak(L++) plan `+!largerThan5(N)` where `N` must be larger than 5 for the plan to succeed:

```agentspeak
+!largerThan5(X)
  : X > 5 <-
    generic/print(X, "is larger than 5")

  : X <= 5 <-
    generic/print(X, "is NOT larger than 5");
    fail
.
```

> **Notice** the `fail` statement in the `X <= 5` branch, which will result in the plan to fail. This is intended to show different execution behaviour.

### Postponed Execution

For example, having a plan-body containing

```agentspeak
!largerThan5(23);
!largerThan5(3)
```

with different variables, two individual trigger instances will be created and queued for execution in the next cycle.
The result will be two plans (one for `N = 3` and the second for `N = 23`) to be run in *parallel* in the next cycle, yielding

```commandline
3.0   is NOT larger than 5
23.0   is larger than 5
```

(The order of output might differ due to concurrency effects.)

### Immediate Execution

Whereas, having a plan-body containing

```agentspeak
!!largerThan5(23);
!!largerThan5(3)
```

the two plans will be executed immediately chained in the given order, i.e. `+!largerThan5(23)` &#8594; `+!largerThan5(3)`.

#### Failure Related Behaviour

**Note**: If denoted and executed in opposite order

```agentspeak
!!largerThan5(3);
!!largerThan5(23)
```

the output will be just

```commandline
3.0   is NOT larger than 5
```

because the plan `+!largerThan5(3)` fails (as intended).

Further execution in the current plan-context stops, i.e `+!largerThan5(23)` will **not** be executed and the parent plan will also fail (see [&#8594; Failing is Intentional](/knowledgebase/failing) on how to handle failing [&#8594; actions](../actions) and sub-plans).

### Duplicated Triggers

Adding the same trigger multiple time yields different results depending on delayed execution `!` and immediate execution `!!`.

```agentspeak
!largerThan5(23);
!largerThan5(23)
```

will yield (despite plan parameters resulting in succeeding plans)

```commandline
23.0   is NOT larger than 5
```

to be printed only **once** as previously explained.

This could be avoided by defining one or both plans to be executed in the *this* cycle, e.g.

```agentspeak
!largerThan5(23);
!!largerThan5(23)
```

will execute the plan triggered in the second row in this cycle, or

```agentspeak
!!largerThan5(23);
!!largerThan5(23)
```

which will execute both plans in this cycle.
In both cases the result will be

```commandline
23.0   is NOT larger than 5
23.0   is NOT larger than 5
```

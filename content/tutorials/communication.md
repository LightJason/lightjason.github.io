---
title: "Tutorial: Communication"
jsonld: ["techarticle"]
---

LightJason architecture does not support in general a build-in communication, because communication and 
agent addressing / naming depends on the domain or underlying software architecture. To create a 
communication structure you have to build-up your own naming model, a send action with a receiving plan and a data structure to map agent names / addresses to agent objects.

{{< toc >}}

> __Don't reinvent the edge__
> <br/>
> Communication can be a _very expensive_ calling structure, especially on distributed systems. If
> you build your own communication structure
> just think about multi-threading and performance aspects. Within this tutorial we cannot show you 
> all details of fast and efficient communication
> data structure, so we would like to show you the basics only. On a distributed system you have to 
> organize the naming schema and searching methods of names and objects. If you need to transfer 
> messages over the network, just think about 
> serialization and deserialization performance.
> Java supports a [serialize interface](https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html) 
> so don't create self-defined string data structure, because for such message transfering there 
> are a lot of other and well-known and estabilished components. Well known formats
> are [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation), [YAML](https://de.wikipedia.org/wiki/YAML) or [XML/XSD with Jaxb](https://de.wikipedia.org/wiki/Java_Architecture_for_XML_Binding)

## Agent

For this example we create a small agent, which sends a random message to the agent with the name ```agent 0```. The initial-goal triggers the ```main```-plan, which generates the message and calls the send action.

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="agent_with_messages.asl" lang="agentspeak" branch="tutorial-agent-communication" >}}
<!-- htmlmin:ignore -->



### Agent with name

For communication a _name resolution_ is needed, so the agents needs to get a name (here a string). This name will be used to determine the sender
of a message

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyCommunicationAgent.java" lang="java" branch="tutorial-agent-communication" >}}
<!-- htmlmin:ignore -->

### Agent factory with name generating

The agent factory must create the agent object and a unique name. Within this example we use one factory only, so
each factory create a _send_ action and the send action contains the name resolution. Based on this, the action must
be accessable within the factory to register each agent. The name definition is here with the schema ```agent <number>```
but __keep in mind that the generate method can be called in parallel, so the counter must be thread-safe.__ Java
supports such [atomic variables](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomicvars.html).

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="src/main/java/myagentproject/MyAgentGenerator.java" lang="java" branch="tutorial-agent-communication" >}}
<!-- htmlmin:ignore -->



## Send-Action with address resolution

For communication basisc a _send_ action must be created. This actions needs also an _address resolution_ for the agent names, this can be an URL access or a string name. Within this example we use a map with string for the agent name and the value for the agent object. Each generated agent must be registered at this action so that other agents can send messages. The action tries to find the agent object based on the name, builds the goal-trigger and transfer the data to the other agent. On the next cycle call of the receiving agent the message goal-plan will be triggered.

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="src/main/java/myagentproject/CSend.java" lang="java" branch="tutorial-agent-communication" >}}
<!-- htmlmin:ignore -->




## Variable-Builder

The variable builder allows to create _individual variables and constants_ during runtin within a plan. In this case we crate the constant ```MyName``` which stores the individual agent name. The ```raw```-method allows to create an object reference with a safe-cast. The variable builder is added to the agent factory.

<!-- htmlmin:ignore -->
{{< githubfile user="LightJason" repo="Examples" file="src/main/java/myagentproject/CVariableBuilder.java" lang="java" branch="tutorial-agent-communication" >}}```


## Reference Solution

If you struggled at some point or wish to obtain our exemplary solution to this tutorial, you can download the archive containing the source code [here](/download/communication-agent.zip). This tutorial depends on the tutorial [AgentSpeak-in-15min](agentspeak-in-fifteen-minutes), so the whole build process is explained within the basic tutorial. If you run the example the shown output can be different. 

For the first run we start the program with 10 agents and 5 iterations:

```commandline
agent 0    received message [   pqepkellesxa   ] from [   agent 2   ] in cycle [   0   ]
agent 0    received message [   vxhfapwtulty   ] from [   agent 5   ] in cycle [   0   ]
agent 0    received message [   ilmhcdofoevm   ] from [   agent 6   ] in cycle [   0   ]

agent 0    received message [   rjnvygvwsbqo   ] from [   agent 0   ] in cycle [   1   ]
agent 0    received message [   dhcfpfhqbpop   ] from [   agent 1   ] in cycle [   1   ]
agent 0    received message [   khtsbiripesx   ] from [   agent 7   ] in cycle [   1   ]
agent 0    received message [   fjxdyjcwfdby   ] from [   agent 4   ] in cycle [   1   ]
agent 0    received message [   anhdriizkknv   ] from [   agent 9   ] in cycle [   1   ]
agent 0    received message [   ewklpggifoym   ] from [   agent 8   ] in cycle [   1   ]
agent 0    received message [   rtxtdqfcuzpl   ] from [   agent 3   ] in cycle [   1   ]
```

and run it again with equal arguments

```commandline
agent 0    received message [   ggbiaiijtvtz   ] from [   agent 0   ] in cycle [   1   ]
agent 0    received message [   mmlxwmifnedq   ] from [   agent 8   ] in cycle [   1   ]
agent 0    received message [   qileeboovtlc   ] from [   agent 2   ] in cycle [   1   ]
agent 0    received message [   ixruabyhlxfi   ] from [   agent 7   ] in cycle [   1   ]
agent 0    received message [   hwkcdbjuqqyc   ] from [   agent 3   ] in cycle [   1   ]
agent 0    received message [   benrjxxkrcog   ] from [   agent 1   ] in cycle [   1   ]
agent 0    received message [   sqkuorfmknuq   ] from [   agent 6   ] in cycle [   1   ]
agent 0    received message [   hcyrnovvacsb   ] from [   agent 9   ] in cycle [   1   ]
agent 0    received message [   ldvxkosghaax   ] from [   agent 5   ] in cycle [   1   ]
agent 0    received message [   vbykpbivcwow   ] from [   agent 4   ] in cycle [   1   ]
```

You can see, that the agent 0 received messages in cycle 0 and 1 and the ordering of the executed plans are different. This behaviour is desired, because all agents run in parallel and so the agent can receive the message before it own cycle is called otherwise the cycle is called and after that the agent receive the message. __So keep in mind that all execution is heavily asynchronized and parallel__

# Multi-Agent Simulation - {{ artefactid }}

This project {{ #url }}[{{{ artefactid }}}]({{{ url }}}){{ /url }}{{ ^url }}{{{ artefactid }}}{{ /url }} contains a full working scenario of [LightJason](http://lightjason.org) multi-agent framework. The scenario description is:

{{ #description }}
> {{{ description }}}
{{ /description }}

The packages is _automatically generated_.

## Usage

The jar file can be executed directly, with

```
java -jar {{{ artefactid }}}-{{{ version }}}.jar
```

### Help

For any help information the option ```-help``` can be set and shows additional information

```
java -jar {{{ artefactid }}}-{{{ version }}}.jar -help
```

### ASL Files Generating

For generating agents (ASL files) the jar can be executed with

```
java -jar {{{ artefactid }}}-{{{ version }}}.jar -create
```

### Simulation Example

First run the ASL generating, after that run the simulation with 

```
java -jar {{{ artefactid }}}-{{{ version }}}.jar -asl {{{ firstagentname }}}Agent.asl -agents 2 -generator {{ #function_tolower }}{{{ firstagentname }}}{{ /function_tolower }} -steps 5
```

it creates 2 agents based on the ASl script ```{{{ firstagentname }}}Agent.asl``` with the generator ```{{ #function_tolower }}{{{ firstagentname }}}{{ /function_tolower }}``` and runs the simulation 5 steps.

## Agents

The following agents are generated 

{{ #agentlist }}
 * ```{{{ name }}}Agent.asl``` {{{ description }}}
{{ /agentlist }}

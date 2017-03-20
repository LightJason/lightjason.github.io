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

### ASL Files

For generating agents (ASL files) the jar can be executed with

```
java -jar {{{ artefactid }}}-{{{ version }}}.jar -create
```

## Agents

The following agents are generated 

{{ #agentlist }}
 * ```{{{ name }}}Agent.asl``` {{{ description }}}
{{ /agentlist }}

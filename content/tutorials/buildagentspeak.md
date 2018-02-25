---
title: "Tutorial: How to Build AgentSpeak from Source"
jsonld: ["techarticle", "course"]
gitter: "tutorials"
previous :
    url: "/tutorials/agentspeak-in-fifteen-minutes"
    text: "Develop an AgentSpeak Scenario in 15min"
next :
    url: "/tutorials/trigger"
    text: "Trigger"    
---

This tutorial explains how to build LightJason/AgentSpeak(L++) from source.
<!--more-->

Following the ```git-flow``` paradigm (see [&#8594; A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/) for details), the [```master``` branch](https://github.com/LightJason/AgentSpeak/tree/master) contains our current releases while the [```developing``` branch](https://github.com/LightJason/AgentSpeak/tree/developing) the ongoing development.

## Tools You Need

* Working Maven greater than 3.0 [installation](http://maven.apache.org/install.html).
* Java __JDK 1.9__ installation which can be obtained [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
* Git installation (optional, but recommended)
  * Linux: Installing ``git`` via your favourite package manager should be sufficient.
  * MacOS: Using [Homebrew](http://brew.sh) with ```brew install git```.
  * [Git for Windows](https://git-for-windows.github.io)

## Build AgentSpeak(L++) from Source

> __Notes:__
>
> * Choose the right branch!
>   * ```master``` -> current release (default branch)
>   * ```developing``` -> _bleeding-edge_ development
>   
> * Obtain the branch which is right for you by either downloading the corresponding _ZIP-archive_ or change the branch inside the cloned git repository (```git checkout <branchname>```).
> * If you chose to download the _ZIP-archive_, be aware that the resulting directory will be ```AgentSpeak-<branchname>```. Either rename it to ```AgentSpeak``` or keep this in mind in the following sections.
> * In this section we assume that you are working inside the directory ```Developer/```. You are of course free to choose your own, in which case, please replace ```Developer/``` accordingly.

1. Obtain the current source code from [AgentSpeak(L++)](https://github.com/LightJason/AgentSpeak) and place it into ```Developer/AgentSpeak```. This can be done on the command line 
    
    * either via Git

	    <!-- htmlmin:ignore -->
	    ```commandline
	    cd Developer
	    git clone https://github.com/LightJason/AgentSpeak.git
		```
		<!-- htmlmin:ignore -->

	    (if you chose to obtain the _bleeding-edge_ AgentSpeak, checkout the ```developing``` branch)

	    <!-- htmlmin:ignore -->
	    ```commandline
	    cd AgentSpeak              
	    git checkout developing
	    ```
	    <!-- htmlmin:ignore -->

	* or by downloading the {{< githubzip user="LightJason" repo="AgentSpeak" branch="master" text="AgentSpeak-master.zip" >}} (or {{< githubzip user="LightJason" repo="AgentSpeak" branch="developing" text="AgentSpeak-developing.zip" >}}) and extracting it to ```Developer/```.

	    <!-- htmlmin:ignore -->
	    ```commandline
	    cd Developer
	    unzip AgentSpeak-master.zip     # or unzip AgentSpeak-developing.zip
	    mv AgentSpeak-master AgentSpeak # or mv AgentSpeak-developing AgentSpeak
	    ```
	    <!-- htmlmin:ignore -->

    You should now have the following directory structure:

    <!-- htmlmin:ignore -->
    ```commandline
    ├── Developer/
    │   └── AgentSpeak/      
    ```
    <!-- htmlmin:ignore -->

2. Change into the AgentSpeak project directory ```Developer/AgentSpeak``` and run ```mvn install``` to build and install AgentSpeak:

    <!-- htmlmin:ignore -->
    ```commandline
    cd Developer/AgentSpeak
    mvn install
    ```
    <!-- htmlmin:ignore -->

    AgentSpeak will be installed as a local maven artifact in the directory ```~/.m2``` and can be imported as a dependency by your project.

    The build process should terminate with a ```BUILD SUCCESS``` message.

3. Add the installed AgentSpeak to your project by adding
    
    * for the ```master``` branch

		<!-- htmlmin:ignore -->
		{{< githubsource user="LightJason" repo="AgentSpeak" branch="master" file="pom.xml" lang="xml" filter="[[:space:]]{4}<groupId>(.|\n)*?</version>" prefix="<dependency>" postfix="</dependency>" >}}
		<!-- htmlmin:ignore -->
	
	* for the ```developing``` branch

		<!-- htmlmin:ignore -->
		{{< githubsource user="LightJason" repo="AgentSpeak" branch="developing" file="pom.xml" lang="xml" filter="[[:space:]]{4}<groupId>(.|\n)*?</version>" prefix="<dependency>" postfix="</dependency>" >}}
		<!-- htmlmin:ignore -->

	to the dependency section of your ```pom.xml```.

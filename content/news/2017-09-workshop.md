---
title: "Multi-Agent Workshop - Traffic Game"
date: 2017-09-29T22:05:43+02:00
categories: ["Project"]
---

We created a _traffic simulation game_ for the [Socal Cars Multi-Agent Workshop](https://www.socialcars.org/).
<!--more-->

The last 3 months were hard work for us, so a very large thank-you to my colleague Malte, Sophie and my student assistant Ehsan for a great job.
Our task was: 

> Preparing a workshop for PhD students which shows a multi-agent simulation. We decided on a _traffic game_ with the following definition:
>
> * create a street with 50km length
> * there are 4 segments with different speed settings
> * the user should create an agent which drives the vehicle
> * the user gets a penalty on slow or fast driving, so the goal is driving the allowed / optimal speed

Some additional features are

* the environment and the street segments are also modelled as an agent
* the GUI is complete browser-based with a game engine and state-of-the-art technologies (REST & Websockets)
* other vehicles are also modelled as agents
* each vehicle can pull out or pull in

You can download the source code and binary jar file

{{< githubrelease user="LightJason" repo="Examples" filter="workshop-trafficsimulation" zip="true" names="trafficsimulation-1.0-SNAPSHOT.jar=Jar Executable" >}}

If you run the Jar file you can find a configuration under ```~/.lightjason/trafficsimulation```. Within the configuration you can enable all agents. Documentation of MAS, LightJason and the scenario are built-in as a slide-show. All parts of the game are open-source and we will publish it later as an online game.

{{< video "https://player.vimeo.com/video/236143206" "https://vimeo.com/lightjason/trafficgame" >}}

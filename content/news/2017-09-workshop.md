---
title: "Multi-Agent Workshop - Traffic Game"
date: 2017-09-29T22:05:43+02:00
categories: ["Project"]
---

We create for the [Socal Cars Multi-Agent Workshop](https://www.socialcars.org/) a _traffic simulation game_.
<!--more-->

The last 3 months were hard work for us, so a very large thank-you to my colleague Malte and my student assistant Ehsan for a great job.
Our task was: 

> Preparing a workshop for PhD students which shows a multi-agent simulation. We decide a _traffic game_ with the following defintion:
>
> * create a street with 50km length
> * there are 4 segments with different speed settings
> * the user should create an agent which drives the vehicle
> * the user gets a penalty on slow or fast driving, so the goal is driving the allowed / optimal speed

Some additional features are

* the environment and the street segments are also modelled as an agent
* the GUI is complete browser based with a game engine and state-of-the-art technologies (REST & Websockets)
* other vehicles are also modelled as agents
* each vehicle can pull-out or pull-in

You can [download an executable Jar](https://github.com/LightJason/Examples/raw/jar-workshop-trafficsimulation/trafficsimulation-1.0-SNAPSHOT.jar), the [source codes](https://github.com/LightJason/Examples/tree/workshop-trafficsimulation) in our example repository. If you run the Jar file you can found any configuration under ```~/.lightjason/trafficsimulation```. Within the configuration you can enable all agents. Dokumentation of MAS, LightJason and the scenario are built-in as a slide-show. All parts of the game are open-source and we will publish it later as an online game.

{{< video "https://player.vimeo.com/video/236143206" "https://vimeo.com/lightjason/trafficgame" >}}

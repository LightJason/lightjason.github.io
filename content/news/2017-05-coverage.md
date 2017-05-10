---
date: 2017-05-10T09:53:24+02:00
draft: true
title: "Code Coverage & Social-Force for Crowd Simulation"
categories: ["Project"]
---

We are working on _unit-testing_ of the whole framework, so we append JUnit test to all main components.
<!--more--> 

* The current line coverage ![Coverage Status](https://coveralls.io/repos/github/LightJason/AgentSpeak/badge.svg?branch=master) can be found on the [Coverall](https://coveralls.io/github/LightJason/AgentSpeak) site and a detailed analytic are within the [documentation](http://lightjason.github.io/AgentSpeak/cobertura). 

* Based on our current work on crowd simulation we are 
are adding a new subproject [SocialForce](https://github.com/LightJason/SocialForce) to your project. This model extends the main [social force model](https://en.wikipedia.org/wiki/Social_force_model) of Dirk Helbing with our agents. We build it in a more abstract structure with _mind and physical distance_ to get a more complex force structure.

# Project Description and Documentation  

This repository is used for publication of additional content of the LightJason project

## Usage

* [Hugo](https://gohugo.io/)
* [Pandoc-Citeproc](http://pandoc.org/)

### Bibliographie

The bibliographie is stored under ```data/references.bib``` as an UTF-8 encoded [Bibtex](http://www.bibtex.org/) file, convert after changes the Bibtex file into a [BibJason](http://okfnlabs.org/bibjson/) file with

```
pandoc-citeproc --bib2json static/references.bib > data/references.json
```

#### Additional Feature

* if you add a key with name ```URL``` to the Bibtex entry the URL can point to of the PDF file, and will create a download link on the publication list
* if you add a key with name ```Note``` you can reference a comment file e.g. the key-value named ```foo``` a file under ```content/publication/foo.md``` must existst with any additional comments of the reference

### Deployment

Run ```hugo``` and copy all data from the ```public``` directory to the ```master```-Branch. The deployment will run automatically on a ```git push``` to the ```developing```-Branch


## Content ToDo's

* Maven to Eclipse & IntelliJ Web-Video (importing projects into IDE)
* ASL Tutorial (Syntax & Semantic Example) with some tricks
* Tutorial Agent-Configuration & -Generatoren 
* Agent-Tutorial (Workflow from an idea to code)
	1. Problem description
	2. Problem splitting into distributed and task-orientated solving
	3. Agent-code developing
	4. Java-code developing - creating a logic-based event-handler with -listener
* Choice-Behaviour
	1. Fitness proportionate selection (Linear & Gibbs-Boltzmann)
	2. CES-function
	4. PCA
	4. Plan execution based on the data
* Action Tutorial - Building action in an efficient way
	1. Term represenatation of data
	2. Term-to-Raw converting
	3. Java-Object representation inside terms
* Simulation-Tutorial
	1. LibGDX with sprites & tilemaps
	2. scenario configuration with YAML
	3. Grid / Graph structure
	4. Perceiving environment
	5. Interaction between agents
* REST-API
	1. Java Webserver (here Jetty)
	2. Servlet Structure
	3. Agent-Inspector 
	4. Agent-Access via REST
	5. UI with jQuery / Angular.JS
* Video-Screencast
	* import IntelliJ pom.xml 
	* import Eclipse pom.xml
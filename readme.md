# Project Description and Documentation  

This repository is used for publication of additional content of the LightJason project

## Usage

* [Hugo](https://gohugo.io/)
* [Pandoc-Citeproc](http://pandoc.org/)

### Bibliographie

The bibliographie is stored under ```data/references.bib``` as an UTF-8 encoded [Bibtex](http://www.bibtex.org/) file, convert after changes the Bibtex file into a [BibJason](http://okfnlabs.org/bibjson/) file with

```
pandoc-citeproc --bib2json references.bib > references.json
```

#### Additional Feature

* if you add a key with name ```URL``` to the Bibtex entry the URL can point to of the PDF file, and will create a download link on the publication list
* if you add a key with name ```Note``` you can reference a comment file e.g. the key-value named ```foo``` a file under ```content/publication/foo.md``` must existst with any additional comments of the reference

### Deployment

Run ```hugo``` and copy all data from the ```public``` directory to the ```master```-Branch. The ```deploy.bash``` script can do the whole work
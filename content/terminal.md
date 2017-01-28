---
title: "Terminal"
draft: true
---

Command formatting can be found on the plugin page on [GitHub](https://github.com/stvwhtly/jquery-teletype-plugin#deleting-characters-)

> The terminal command seperates with ```p```-tags _commands_ annd _command results_. Results are optional, but if the results are used the
number of command ```p```-tags and result ```p```-tags must be equal

## Basic

Arguments of the Hugo _terminal_ shortcode (all arguments are optional):

1. Argument is the _terminal prefix_ (default is empty)
2. Argument is DOM-ID to create an unique referenced ID of the terminal (default is empty)
3. Argument is the height of the terminal box (default is _10em_ [10 text-lines])
4. Argument is the width of the terminal box (default is _100%_)

{{< terminal "~prefix:" "test""16em" >}}
<p class="command">each line must be ^2000 within a p tag</p>
<p class="result"></p>
<p class="command">do typing with erororororor~10ror and some other text</p>
<p class="result"></p>
<p class="command">second line for layout with result</p>
<p class="result">-- This is the <em>result</em> of the second command--</p>
<p class="command">two line typing with pause in 5 seconds ^5000 \nnext line with foo bar</p>
<p class="result"></p>
{{< /terminal >}}

## Control

For resetting and/or start typing there exists a single Hugo shortcode with two arguments

1. DOM-ID of the terminal tag (see above)
2. HTML code between the link tags, should be a plain text normaly

{{< terminalreset "test" "start / reset terminal typing" >}}


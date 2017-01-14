---
title: "Terminal"
draft: true
---

Formatierung und animation können im Text kontrolliert werden, siehe [GitHub](https://github.com/stvwhtly/jquery-teletype-plugin#deleting-characters-)

> Es müssen p-Tags mit der Klasse _command_ gesetzt werden für die einzelnen Zeilen, die als Command definiert sind

<br/>

> Um Results für die Commands zu setzen muss hinter ein p-Tag mit der Klasse _result_ gesetzt werden. Es müssen genauso viele Result-Tags sein, wie Command-Tags, aber sie können dann leer sein

<br/>

Parameter für das _terminal_ Command (sind alle optional):

1. Parameter ist das _Terminalprefix_ (Default ist leer)
2. Parameter ist die DOM-ID ggf um das Temrinal direkt zu referenzien
3. Parameter ist die Breite der Box (Default ist _100%_)
4. Parameter ist die Höhe der Box (Default ist _10em_ [10 Zeilen])

{{< terminal "~prefix:" "test" "65%" "8em" >}}
<p class="command">each line must be within a p tag</p>
<p class="result"></p>
<p class="command">second line for layout</p>
<p class="result">-- Das soll das Result von von Command 2 sein--</p>
<p class="command">two line typing with pause in 5 seconds ^5000 \nnext line with foo bar</p>
<p class="result"></p>
{{< /terminal >}}

Um das Terminal zu resetten wird ein eigenes Command genutzt, wobei zwei Parameter vorhanden sind

1. Der DOM-ID Tag des Terminals
2. Der HTML-Code zwischen den Link

{{< terminalreset "test" "reset terminal" >}}



---
title: "Basic Knowledge: Finite-State Machine"
jsonld: ["techarticle", "course"]
previous :
    url: "/knowledgebase/logicalprogramming"
    text: "kb: Background - Logical Programming"
next :
    url: "/knowledgebase/agent"
    text: "kb: Background - Finite-State Machine and Logical Programming to an Agent"
---

{{< includejs "/statemachine.js" >}}

## State Machine

A [Finite-State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) is a system with explicitly defined states and transitions between the states with the following syntax

<!--more-->

- a __state__ is presented by a circle and defines a _stable execution point_
- a __final state__ is defined by a circle with a _double outline_
- the state machine defines a single __initial state__ with a triangle
- a __transition__ is presented by an arrow which starts in a state and ends in a state. A transition symbol is an active execution call like a function

Mostly the state name is documented within a state; the arrow of a transition can also be used for documentation.

> This example shows a similar state machine with three states that runs from the _initial state_ to a _final state_ (left to right). This example shows the _static structure_ of the state machine, so there is no runtime information within the illustration
> {{< img src="/images/fsm1.svg" alt="finite-state machine" width="30%" >}}


### Usage and Example

State machines are an useful tool to describe [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) and we would like to motivate this concept for explaining the functional principle:

> The main goal is to create a system which can check strings that matchs the following criteria:
> The strings starts with an arbitrary sequence of the letter ```a``` or ```b``` (the sequence can be empty).
> After the initial sequence follows a positive number which can be any digit.
> The end of the digit sequence is a sequence of the letter ```x``` with two letters at minimum. All letters within this string can be lower- or upper-case. Some valid example sequences: ```ab1x```, ```aaabbb169Xx```, ```AaAabbBB972xXxXXXX```

Most programming languages define such regular expression in a [perl notation](https://en.wikipedia.org/wiki/Regular_expression#Perl) or [posix notation](https://en.wikipedia.org/wiki/Regular_expression#POSIX_basic_and_extended). We use for the example the posix notation which is defined as:

```(a|A|b|B)*  [0-9]+  (x|X){2,}```

* The first block ```(a|A|b|B)*``` defines the different letters and the ```|``` defines the _or_-Operator. At the end the ```*```-operator defines $\geq 0$ elements.
* The second block ```[0-9]+``` defines _all elements between 0 and 9_ and the ```+```-operator sets the number of elements $\geq 1$
* The third block ```(x|X){2,}``` defines similar to the first both letter cases and the ```{2,}``` defines the number of elements with $\geq 2$

Based on this definition, it is possible to define a state machine which can check if the string matchs the given structure. During runtime, the string is read character by character and based on the state machine a transition from <a href="#regex" id="animate-state-1">start state</a> to <a href="#regex" id="animate-state-4">final state</a> will be found. If the state machine terminates in the <a href="#regex" id="animate-state-error">error state</a> or on any other state, the string does not match. For example:

* <a href="#regex" id="animate-valid">animate state machine with the valid string:</a> <span id="show-valid"><span class="checked">aaabbb169XxX</span><span class="unchecked"></span></span>
* <a href="#regex" id="animate-nonvalid">animate state machine with the non-valid string:</a> <span id="show-nonvalid"><span class="checked">AA2b</span><span class="unchecked"></span></span>
 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="241 109 499 411" id="regex"><defs id="defs6"><font-face font-size="10" underline-position="-178.223" underline-thickness="57.617" x-height="462.402" cap-height="594.727" ascent="753.906" descent="-246.094" font-weight="500" id="font-face8"><font-face-src><font-face-name name="monospace"/></font-face-src></font-face><marker orient="auto" overflow="visible" id="FilledArrow_Marker" viewBox="-1 -4 10 8" markerWidth="10" markerHeight="8" color="#000"><g id="g11"><path d="M8 0L0-3v6z" fill="currentColor" stroke="currentColor" id="path13"/></g></marker><marker orient="auto" overflow="visible" id="FilledArrow_Marker_2" viewBox="-9 -4 10 8" markerWidth="10" markerHeight="8" color="#000"><g id="g16"><path d="M-8 0l8 3v-6z" fill="currentColor" stroke="currentColor" id="path18"/></g></marker></defs><circle cx="300" cy="202.5" r="22.5" id="state-1" fill="#fff"/><circle cx="300" cy="202.5" r="22.5" id="circle30" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><text id="text32" x="287" y="194.5"><tspan font-size="10" font-weight="500" x="296.099" y="207.5" textLength="7.801" id="tspan34">1</tspan></text><path d="M252 190.5l25.5 12.75L252 216z" id="path36" fill="#fff"/><path d="M252 190.5l25.5 12.75L252 216z" id="path38" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle cx="517.5" cy="202.5" r="22.5" id="state-2" fill="#fff"/><circle cx="517.5" cy="202.5" r="22.5" id="circle42" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><text id="text44" x="504.5" y="194.5"><tspan font-size="10" font-weight="500" x="513.599" y="207.5" textLength="7.801" id="tspan46">2</tspan></text><circle cx="706.5" cy="409.5" r="22.5" id="circle48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle cx="706.5" cy="409.5" r="18.75" id="state-4" fill="#fff"/><circle cx="706.5" cy="409.5" r="18.75" id="circle52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><text id="text54" x="696.5" y="401.5"><tspan font-size="10" font-weight="500" x="702.599" y="414.5" textLength="7.801" id="tspan56">4</tspan></text><circle cx="517.5" cy="409.5" r="22.5" id="circle58" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><circle cx="517.5" cy="409.5" r="18.75" id="state-error" fill="#fff"/><circle cx="517.5" cy="409.5" r="18.75" id="circle62" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><text id="text64" x="507.5" y="401.5"><tspan font-size="10" font-weight="500" x="513.599" y="414.5" textLength="7.801" id="tspan66">E</tspan></text><text id="text68" x="304.351" y="316.127"><tspan font-size="10" font-weight="500" x="304.745" y="329.127" textLength="70.211" id="tspan70">everything</tspan> <tspan font-size="10" font-weight="500" x="324.249" y="345.127" textLength="31.205" id="tspan72">else</tspan></text><path d="M308.731 223.243c10.32 20.994 31.13 55.458 69.269 91.757 39.627 37.714 85.98 66.004 114.02 81.393" id="path-1toerror" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)"/><text id="text76" x="438" y="266.379"><tspan font-size="10" font-weight="500" x="438.494" y="279.379" textLength="78.013" id="tspan78">everything</tspan> <tspan font-size="10" font-weight="500" x="461.897" y="295.379" textLength="31.205" id="tspan80">else</tspan></text><path id="path-2toerror" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M517.5 225v155.85"/><circle cx="607.5" cy="301.5" r="22.5" id="state-3" fill="#fff"/><circle cx="607.5" cy="301.5" r="22.5" id="circle86" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"/><text id="text88" x="594.5" y="293.5"><tspan font-size="10" font-weight="500" x="603.599" y="306.5" textLength="7.801" id="tspan90">3</tspan></text><text id="text92" x="558.446" y="357.364"><tspan font-size="10" font-weight="500" x="558.939" y="370.364" textLength="78.013" id="tspan94">everything</tspan> <tspan font-size="10" font-weight="500" x="582.343" y="386.364" textLength="31.205" id="tspan96">else</tspan></text><path id="path-3toerror" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M593.095 318.786l-57.253 68.704"/><text id="text100" x="568.643" y="413.5"><tspan font-size="10" font-weight="500" x="569.137" y="426.5" textLength="78.013" id="tspan102">everything</tspan> <tspan font-size="10" font-weight="500" x="592.541" y="442.5" textLength="31.205" id="tspan104">else</tspan></text><path id="path-4toerror" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M684 409.5H546.15"/><path d="M501.422 433.19c-5.293 9.538-9.196 19.706-6.422 25.81 6.374 14.024 38.626 14.024 45 0 3.627-7.978-4.156-22.9-11.54-34.283" id="path-errortoerror" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-start="url(#FilledArrow_Marker_2)"/><text id="text110" x="478.448" y="473.516"><tspan font-size="10" font-weight="500" x="478.941" y="486.516" textLength="78.013" id="tspan112">everything</tspan> <tspan font-size="10" font-weight="500" x="502.345" y="502.516" textLength="31.205" id="tspan114">else</tspan></text><path d="M313.752 184.688C324.957 168.892 338.147 146.581 333 135c-8.5-19.123-53.65-19.123-63 0-4.674 9.561 2.825 26.435 11.493 40.92" id="path-1to1" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)"/><text id="text118" x="285.299" y="125.661"><tspan font-size="10" font-weight="500" x="285.697" y="138.661" textLength="31.205" id="tspan120">a|A|</tspan> <tspan font-size="10" font-weight="500" x="289.597" y="154.661" textLength="23.404" id="tspan122">b|B</tspan></text><path id="path-1to2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M322.5 202.5h162.6"/><text id="text126" x="367.332" y="166.833"><tspan font-size="10" font-weight="500" x="367.826" y="179.833" textLength="78.013" id="tspan128">0|1|1|3|4|</tspan> <tspan font-size="10" font-weight="500" x="371.727" y="195.833" textLength="70.211" id="tspan130">5|6|7|8|9</tspan></text><path d="M535.022 188.382C553.286 172.57 577.848 147.517 567 135c-16.573-19.123-93.976-19.123-108 0-8.22 11.21 13.298 32.472 32.515 48.149" id="path-2to2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)"/><text id="text134" x="472.779" y="126.658"><tspan font-size="10" font-weight="500" x="473.273" y="139.658" textLength="78.013" id="tspan136">0|1|2|3|4|</tspan> <tspan font-size="10" font-weight="500" x="477.173" y="155.658" textLength="70.211" id="tspan138">5|6|7|8|9</tspan></text><path id="path-2to3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M532.635 219.149l53.07 58.377"/><path id="path-3to4" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#FilledArrow_Marker)" d="M622.704 318.086l64.436 70.294"/><text id="text144" x="563.301" y="232.809"><tspan font-size="10" font-weight="500" x="563.599" y="245.809" textLength="23.404" id="tspan146">x|X</tspan></text><text id="text148" x="651.484" y="329.415"><tspan font-size="10" font-weight="500" x="651.782" y="342.415" textLength="23.404" id="tspan150">x|X</tspan></text></svg>


## Petri Net

Based on the static information of the state machine, it can be extended to a [petri net](https://en.wikipedia.org/wiki/Petri_net), which allows describing agent behaviour during runtime. 

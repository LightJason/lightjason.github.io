"use strict"
jQuery(function(){jQuery(".category_showall").click(function(){jQuery(".item_category").parent().fadeIn("slow",function(){})}),jQuery(".item_category").click(function(){jQuery("[data-category="+jQuery(this).attr("data-category")+"]").parent().fadeOut("slow",function(){})}),jQuery("#toc").toc({selectors:"h2,h3,h4,h5,h6",container:".body"}),jQuery("#tochideshow").click(function(){jQuery("#toc").fadeToggle("slow",function(){jQuery("#tochideshow").text().match(/hide/i)?jQuery("#tochideshow").text("Show"):jQuery("#tochideshow").text("Hide")})}),jQuery("#nav").click(function(){jQuery(".sidebar").data("active")?(jQuery(".sidebar").css("width","0"),jQuery(".sidebar").css("margin-left","0"),jQuery(".sidebar").data("active",!1)):(jQuery(".sidebar").css("width","250px"),jQuery(".sidebar").css("margin-left","0"),jQuery(".sidebar").data("active",!0))}),jQuery(".teletype").each(function(){jQuery(this).teletype({text:jQuery(this).find("p.command").map(function(){return jQuery(this).text().trim()}),result:jQuery(this).find("p.result").map(function(){return jQuery(this).html()}),prefix:jQuery(this).attr("data-prefix"),cursor:"▋",automaticstart:!1})}),jQuery(".teletypereset").click(function(){jQuery("#"+jQuery(this).attr("data-terminal")).teletype().reset().start()}),jQuery("h2,h3,h4,h5,h6").filter("[id]").each(function(){jQuery(this).html('<a href="#'+jQuery(this).attr("id")+'">'+jQuery(this).html()+"</a>")}),jQuery(".tooltiptoggle").click(function(){jQuery(this).children(".tooltipcontent:first").slideToggle()}),window.innerWidth<=1e3&&jQuery("body").hammer().bind("swipeleft",function(){var e=jQuery(this).data("nextpage")
e&&(window.location.href=e)}),window.innerWidth<=1e3&&jQuery("body").hammer().bind("swiperight",function(){var e=jQuery(this).data("previouspage")
e&&(window.location.href=e)})})
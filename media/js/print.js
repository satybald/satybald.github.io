$(function(){$("#leaf-content p:has(a)").add("#leaf-content ol:has(a)").add("#leaf-content ul:has(a)").each(function(){var a=$(this).find("a").not("[href^='#']").not(":has(img)").clone();$(this).after(a);a.wrap("<li></li>").parent().wrapAll('<ul class="print-links"></ul>');a.each(function(){var b=$(this).attr("href");if(b.match("^/")){b="http://stevelosh.com"+b}$(this).after(": "+b)})})});
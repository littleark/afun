var stylesheets = document.styleSheets;
console.log(stylesheets)
for (i in stylesheets) {
        var stylesheet = stylesheets[i];
        var rules = stylesheet.cssRules;
        for (j in rules) {
                console.log("RULE",j,(rule instanceof CSSFontFaceRule))
                var rule = rules[j];
                if (rule instanceof CSSFontFaceRule) {

                        

                        var src = rule.style.getPropertyValue('src');
                        var srcSansLocal = src.replace(/local\([^\)]+?\)\s*,\s*/i, '');

                        console.log("setting src of",JSON.stringify(rule),srcSansLocal)

                        rule.style.setProperty('src', srcSansLocal, null);
                }
        }
}
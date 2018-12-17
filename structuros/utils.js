// Helper functions for commands in SOS.bin

var SOS = window.SOS || {};

SOS.man = {};

SOS.unused = function () {
    // Suppress linter warning about unused inputs
    "use strict";
    return;
};

SOS.fix = function (argument) {
    // If argument is string it must be quoted so that it is valid json and can be processed by next command
    "use strict";
    return typeof argument === "string" ? JSON.stringify(argument, undefined, 4) : argument;
};

SOS.isEmptyObject = function (argument) {
    // Return true if argument is empty object {}
    "use strict";
    return Object.keys(argument).length === 0 && argument.constructor === Object;
};

SOS.filter = function (input, argument) {
    // return object properties from input only contained in argument
    "use strict";
    var o = {};
    var k;
    var i;
    console.log("af", argument);
    if (!argument || SOS.isEmptyObject(argument)) {
        return SOS.fix(input);
    }
    // no input cannot be filtered
    if (!input) {
        return input;
    }
    // argument is string (user want single value)
    if (typeof argument === "string" && input.hasOwnProperty(argument)) {
        o[argument] = input[argument];
        return SOS.fix(o);
    }
    // argument is array of property names, e.g. ["seconds", "minutes"]
    if (Array.isArray(argument)) {
        for (i = 0; i < argument.length; i++) {
            k = argument[i];
            if (input.hasOwnProperty(k)) {
                o[k] = input[k];
            }
        }
        return SOS.fix(o);
    }
    // argument is "sample" input with same properties, e.g. {seconds:1, minutes:1}
    for (k in argument) {
        if (argument.hasOwnProperty(k)) {
            if (input.hasOwnProperty(k)) {
                o[k] = input[k];
            }
        }
    }
    return SOS.fix(o);
};

SOS.echo = function (text) {
    // Add text to standard output
    "use strict";
    var div;
    var old = document.getElementById("old");
    div = document.createElement("div");
    if (text === "&nbsp;") {
        div.innerHTML = "&nbsp;";
    } else {
        div.textContent = typeof text === "object" ? JSON.stringify(text, undefined, SOS.env.indent) : text;
        div.style.whiteSpace = "pre-wrap";
    }
    div.style.color = SOS.env.color || "white";
    old.appendChild(div);
    return div;
};

SOS.error = function (text) {
    // Add text to standard error, different color for different errors
    "use strict";
    var div = SOS.echo(text);
    var s = text.toString();
    var e;
    if (s) {
        if (s === "null") {
            div.style.color = "silver";
        }
        // errors
        for (e in SOS.env.errors) {
            if (SOS.env.errors.hasOwnProperty(e)) {
                if (s.startsWith(e + ":")) {
                    div.style.color = SOS.env.errors[e] || "red";
                }
            }
        }
    }
    return div;
};

SOS.focus = function (cursorEnd) {
    // Focus command input, scroll it to view and if needed set cursor to end
    "use strict";
    SOS.cmd.scrollIntoView();
    SOS.cmd.focus();
    if (SOS.cmd.textContent !== "" && SOS.cmd.textContent !== " " && cursorEnd) {
        document.getSelection().collapse(SOS.cmd, 1);
    }
    document.getElementById("ps1").textContent = SOS.env.ps1.replace("~", SOS.fs.pwd);
};

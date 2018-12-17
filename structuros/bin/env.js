// Show and change environment settings

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.env = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // default env settings
    var defaults = {
            try: true,
            ps1: "guest@" + (document.location.host || "local") + ":~$ ",
            ps1color: "lime",
            inputColor: "yellow",
            indent: 4,
            color: "white",
            backgroundColor: "black",
            backgroundImage: "url(image/background.png)",
            fontFamily: "WhiteRabbit.ttf",
            fontSize: "large",
            errors: {
                "Warning": "yellow",
                "Error": "red",
                "SyntaxError": "orange",
                "SplitError": "violet",
                "InputError": "magenta",
                "TypeError": "fuchsia"
            }
    };

    // man
    if (argument === SOS.man) {
        return {
            summary: "Show and change environment settings",
            synopsis: ["env", "env ARGUMENT"],
            description: [
                "Program env without attributes print current environment settings.",
                "With argument it changes those settings."
            ],
            options: undefined,
            returns: ["New environment settings"],
            errors: undefined,
            examples: [
                "env",
                "env {backgroundColor: \"red\"}",
                "env {backgroundColor: \"red\", fontFamily: \"Times New Roman\"}",
                "env {backgroundImage: \"unset\", backgroundColor: \"#333\"}",
                "env {fontSize: \"26px\"}",
                "env {indent: 2}",
                "env {ps1: \"tomato$~ \"}",
                "env {ps1color: \"lime\", inputColor: \"black\", color: \"black\", backgroundColor: \"white\", backgroundImage: \"unset\"}"
            ],
            defaults: defaults,
            see_also: ["echo", "beep"]
        };
    }

    // load current settings
    var o = localStorage.hasOwnProperty("ENV") ? JSON.parse(localStorage.getItem("ENV")) : defaults;
    var k;

    // apply changes
    for (k in argument) {
        if (argument.hasOwnProperty(k)) {
            o[k] = argument[k];
            // css of body?
            if (document.body.style.hasOwnProperty(k)) {
                document.body.style[k] = o[k];
                continue;
            }
        }
    }
    document.getElementById("ps1").textContent = o.ps1;
    document.getElementById("ps1").style.color = o.ps1color;
    document.getElementById("cmd").style.color = o.inputColor;

    // save changes
    localStorage.setItem("ENV", JSON.stringify(o));

    SOS.env = o;
    return o;
};


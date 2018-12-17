// Add message to system log

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.log = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Add message to system log",
            synopsis: ["log ARGUMENT"],
            description: ["Program log will add argument to the end of the system log. It returns input therefore it can be used in the middle of a pipe without affecting the output."],
            options: undefined,
            returns: ["Input"],
            errors: undefined,
            examples: [
                "log {x:1, y: 2}",
                "log \"hello\""
            ],
            see_also: ["loginput", "logcat"]
        };
    }

    // load current log
    var a = localStorage.hasOwnProperty("LOG")
        ? JSON.parse(localStorage.getItem("LOG"))
        : [];

    // add argument
    a.push({program: SOS.pipePreviousCommand, date: Date.now(), argument: argument});

    // save current log
    localStorage.setItem("LOG", JSON.stringify(a));

    return input;
};


// Return entire system log

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.logcat = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return entire system log",
            synopsis: ["logcat"],
            description: undefined,
            options: undefined,
            returns: ["System log"],
            errors: undefined,
            examples: [
                "logcat"
            ],
            see_also: ["log", "loginput"]
        };
    }

    // read log
    var a = localStorage.hasOwnProperty("LOG")
        ? JSON.parse(localStorage.getItem("LOG"))
        : [];

    return a;
};


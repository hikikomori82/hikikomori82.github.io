// Add input data to system log

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.loginput = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Add input data to system log",
            synopsis: ["command | loginput FILTER"],
            description: ["Program loginput will add filtered data from input the end of the system log. It returns input therefore it can be used in the middle of a pipe without affecting the output. If filter is not preset entire input will be logged."],
            options: undefined,
            returns: ["Input"],
            errors: undefined,
            examples: [
                "uname | loginput | values",
                "uname | loginput {kernel: 1, version: 1} | values"
            ],
            see_also: ["log", "logcat"]
        };
    }

    // filter input
    var a = argument
        ? SOS.bin.filter(input, argument)
        : input;

    // add filtered input to log
    return SOS.bin.log(input, a);
};


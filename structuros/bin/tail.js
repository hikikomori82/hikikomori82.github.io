// Return last N items of input array

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.tail = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return last N items of input array",
            synopsis: ["command | tail COUNT"],
            description: undefined,
            options: undefined,
            returns: ["Last N items of input array"],
            errors: undefined,
            examples: [
                "logcat | tail 3"
            ],
            see_also: ["logcat", "filter"]
        };
    }

    // input must be array
    if (!Array.isArray(input)) {
        SOS.error("Error: input is not an array");
        return;
    }
    if (!Number.isInteger(argument)) {
        SOS.error("Error: argument is not an integer");
        return;
    }

    // last N items
    return input.slice(-argument);
};


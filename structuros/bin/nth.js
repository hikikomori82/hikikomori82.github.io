// Return Nth item of input array

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.nth = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return Nth item of input array ",
            synopsis: ["command | nth INDEX"],
            description: undefined,
            options: undefined,
            returns: ["Value of INDEX-th item in input array"],
            errors: undefined,
            examples: [
                "cat /etc/motd | split \n | nth 1 | parse"
            ],
            see_also: ["tail", "filter"]
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
    return input.slice(argument)[0];
};


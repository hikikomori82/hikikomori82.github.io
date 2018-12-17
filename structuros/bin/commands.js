// Show all commands

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.commands = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Array of all available commands",
            synopsis: "examples",
            description: "Return array of all available commands. Unlike man this does not show anything else only command names.",
            options: undefined,
            returns: ["Array of command names"],
            errors: undefined,
            examples: ["commands", "commands | count"],
            see_also: ["man"]
        };
    }

    return Object.keys(SOS.bin);
};

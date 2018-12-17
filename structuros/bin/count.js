// Count items in input

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.count = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Count items in input",
            synopsis: ["command | count"],
            description: undefined,
            options: undefined,
            returns: ["Number of array items, object keys or string chars in input structure"],
            errors: undefined,
            examples: ["uname | count", "cat \"/etc/motd\" | count", "cat \"/etc/motd\" | fix | count", "cat \"/etc/motd\" | split | count"],
            see_also: ["join", "cat", "split", "keys", "values"]
        };
    }

    if (Array.isArray(input)) {
        return input.length;
    }
    if (typeof input === "object") {
        return Object.keys(input).length;
    }
    if (typeof input === "string") {
        return input.length;
    }
    SOS.error("Error: input is not array, object or string but " + typeof input);
    return 0;
};

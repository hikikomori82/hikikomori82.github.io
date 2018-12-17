// Split input string by separator

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.split = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Split input string by separator",
            synopsis: ["command | split \"SEPARATOR\""],
            description: undefined,
            options: undefined,
            returns: ["Array of strings"],
            errors: undefined,
            examples: ["cat \"/etc/motd\" | split \"\\n\""],
            see_also: ["join", "cat"]
        };
    }

    if (typeof input !== "string") {
        SOS.error("Error: input is not a string");
        return "";
    }
    var separator = typeof argument === "string"
        ? argument
        : "\n";
    return input.split(separator);
};

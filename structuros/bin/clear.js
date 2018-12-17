// Clear screen

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.clear = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Clear the terminal screen",
            synopsis: "clear",
            description: undefined,
            options: undefined,
            returns: ["Empty string"],
            errors: undefined,
            examples: ["clear"],
            see_also: ["echo"]
        };
    }

    // actually clear screen and return
    document.getElementById("old").textContent = "";
    return "";
};


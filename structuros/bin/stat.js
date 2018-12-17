// Return file or directory details

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.stat = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return file or dir details",
            synopsis: ["stat [path]"],
            description: undefined,
            options: undefined,
            returns: ["File structure", "Empty string on error"],
            errors: undefined,
            examples: ["stat \"/home/test.txt\"", "stat \"/bin/echo.js\" | filter \"content\" | values | join"],
            see_also: ["editor", "ls", "cat", "mkdir"]
        };
    }

    if (typeof argument === "string") {
        // NOTE: this returns editable reference, not very safe but I want to see what will happen, maybe some interesting use case will emerge
        return SOS.fs.open(argument);
    }
    SOS.error("Error: \"" + argument + "\" is not a path");
    return "";
};

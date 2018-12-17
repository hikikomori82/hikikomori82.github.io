// Create file if it does not exist

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.touch = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Create file if it does not exist",
            synopsis: ["touch [path]"],
            description: undefined,
            options: undefined,
            returns: ["File structure"],
            errors: undefined,
            examples: ["touch \"/home/test.txt\"", "touch \"bread/white.txt\""],
            see_also: ["editor", "ls", "cat", "mkdir"]
        };
    }

    if (typeof argument === "string") {
        return SOS.fs.touch(argument);
    }
    SOS.error("Error: \"" + argument + "\" is not a path");
    return "";
};

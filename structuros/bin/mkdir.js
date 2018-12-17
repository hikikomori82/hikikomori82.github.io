// Create directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.mkdir = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Create directory",
            synopsis: ["mkdir PATH"],
            description: undefined,
            options: undefined,
            returns: ["Structure of created directory"],
            errors: undefined,
            examples: ["mkdir \"/home/test\"", "cd test | mkdir \"first\""],
            see_also: ["editor", "ls", "cat", "touch", "stat"]
        };
    }

    if (typeof argument === "string") {
        return SOS.fs.mkdir(argument);
    }
    SOS.error("Error: \"" + argument + "\" is not a path");
    return "";
};

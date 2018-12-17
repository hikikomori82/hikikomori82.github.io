// Remove file or directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.rm = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Remove file or directory  ",
            synopsis: ["rm [path]"],
            description: [""],
            options: undefined,
            returns: ["Removed file structure", "Empty string on failure"],
            errors: undefined,
            examples: ["rm \"/home/food\"", "rm \"bread/white.txt\""],
            see_also: ["touch", "ls", "cat", "mkdir"]
        };
    }

    if (typeof argument === "string") {
        return SOS.fs.rm(argument);
    }
    SOS.error("Error: \"" + argument + "\" is not a path");
    return "";
};

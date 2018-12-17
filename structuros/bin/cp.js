// Copy file or directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.cp = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Copy file or directory",
            synopsis: ["cp {src:PATH1, dst:PATH2}"],
            description: undefined,
            options: undefined,
            returns: "Empty string",
            errors: undefined,
            examples: ["cp {src:\"/home/mydir/food\", dst:\"/home/trash\"}"],
            see_also: ["mv", "rm", "mkdir"]
        };
    }

    if (typeof argument !== "object" || typeof argument.src !== "string" || typeof argument.dst !== "string") {
        SOS.error("Error: \"" + argument + "\" is not structure with src and dst attributes");
        return;
    }
    return SOS.fs.cp(argument.src, argument.dst);
};

// Move file or directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.mv = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Move file or directory",
            synopsis: ["mv {src:PATH1, dst:PATH2}"],
            description: undefined,
            options: undefined,
            returns: "Empty string",
            errors: undefined,
            examples: ["mv {src:\"/home/mydir/food\", dst:\"/home/trash\"}"],
            see_also: ["cp", "rm", "mkdir"]
        };
    }

    if (typeof argument !== "object" || typeof argument.src !== "string" || typeof argument.dst !== "string") {
        SOS.error("Error: \"" + argument + "\" is not structure with src and dst attributes");
        return;
    }
    return SOS.fs.mv(argument.src, argument.dst);
};

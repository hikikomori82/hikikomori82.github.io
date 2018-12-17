// Return working directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.pwd = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return working directory",
            synopsis: ["pwd"],
            description: undefined,
            options: undefined,
            returns: ["Working directory"],
            errors: undefined,
            examples: ["pwd"],
            see_also: ["ls", "cd"]
        };
    }

    return SOS.fix(SOS.fs.pwd || "/");
};

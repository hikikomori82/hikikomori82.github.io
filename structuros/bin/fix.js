// Convert input string to string structure

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.fix = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Convert input string to string structure",
            synopsis: ["cat [path] | fix"],
            description: ["Certain commands (join) return string which is not a valid structure, fix will wrap it in quotes, thus converting it to structure that can be processed in pipe."],
            options: undefined,
            returns: ["String"],
            errors: undefined,
            examples: ["join [1,2,3] \"_\" | fix | parse"],
            see_also: ["parse"]
        };
    }

    if (typeof input === "string") {
        return SOS.fix(input);
    }
    return input;
};

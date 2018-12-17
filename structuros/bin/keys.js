// Return keys of input structure as array of strings

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.keys = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return keys of input structure as array of strings",
            synopsis: ["command | keys", "keys [INPUT]"],
            description: undefined,
            options: undefined,
            returns: "Array of strings",
            errors: undefined,
            examples: [
                "keys {foo:1, bar:2}",
                "uname | keys",
                "uname | keys | join \",\""
            ],
            see_also: ["values"]
        };
    }

    // return keys
    return Object.keys(input || argument);
};

// Return values of input structure as array of values

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.values = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return values of input structure as array of values",
            synopsis: ["command | values", "values [INPUT]", "values [INPUT] [ARGUMENT]"],
            description: undefined,
            options: undefined,
            returns: "Array of values",
            errors: undefined,
            examples: [
                "values {foo:1, bar:2}",
                "uname | values"
            ],
            see_also: ["keys"]
        };
    }

    // get values to array
    var k;
    var ret = [];
    for (k in input) {
        if (input.hasOwnProperty(k)) {
            ret.push(input[k]);
        }
    }

    // Return argument
    return SOS.fix(ret);
};

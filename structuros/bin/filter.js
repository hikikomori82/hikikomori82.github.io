// Filter input using argument

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.filter = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Filter input using argument",
            synopsis: ["filter [INPUT] [ARGUMENT]", "command | filter [ARGUMENT]"],
            description: undefined,
            options: undefined,
            returns: ["Input with only properties from the argument"],
            errors: undefined,
            examples: [
                "filter {a:1, b:2, c:3} [\"a\", \"c\"]",
                "filter {a:1, b:2, c:3} {a:1, c:1}",
                "uname | filter {kernel:1, version:1}",
                "uname | filter [\"kernel\", \"version\"]",
                "man \"beep\" | filter \"examples\""
            ],
            see_also: ["clear"]
        };
    }

    // Return argument
    return SOS.filter(input, argument);
};

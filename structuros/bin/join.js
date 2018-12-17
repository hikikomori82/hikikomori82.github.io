// Join array into string using optional glue

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.join = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Join array into string using optional glue",
            synopsis: ["command | join", "join [INPUT]", "join [INPUT] [ARGUMENT]"],
            description: ["???"],
            options: {glue: "Glue used to glue input together, for example \", \" or \"_\""},
            returns: ["???"],
            errors: undefined,
            examples: [
                "uname | values | join {glue: \" \"}",
                "uname | filter {kernel:1, version:1} | values | join {glue: \" \"}",
                "uname | filter {kernel:1, version:1} | values | join \" \"",
                "uname | values | join ,",
                "examples | join \"\\n\""
            ],
            see_also: ["???"]
        };
    }

    // what is glue
    var glue = typeof argument === "string"
        ? argument
        : ((argument && argument.glue) || "");

    // get values to array
    if (!Array.isArray(input)) {
        SOS.error("InputError: join expects array input but \"" + typeof input + "\" given");
    }
    return input.join(glue);
};

// Show all examples from man pages

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.examples = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Show all examples from man pages",
            synopsis: "examples",
            description: "Examples will search all man pages for all commands and print all examples found in these man pages. This is good example how StructurOS allows to simply process available system information because everything is structure.",
            options: undefined,
            returns: ["Array of examples"],
            errors: undefined,
            examples: ["examples", "examples | pretty", "examples | join \\n"],
            see_also: ["commands", "man"]
        };
    }

    // get man examples for all commands
    var k;
    var m;
    var all = [];
    for (k in SOS.bin) {
        if (SOS.bin.hasOwnProperty(k)) {
            m = SOS.bin.man(null, k);
            if (m && m.examples) {
                all = all.concat(m.examples);
            }
        }
    }
    return all;
};

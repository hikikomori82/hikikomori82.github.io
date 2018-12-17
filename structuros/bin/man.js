// Show available commands or their documentation

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.man = function (input, argument) {
    "use strict";

    // man for single command will pass "man" object to program thus forcing it to print it's man
    if (typeof argument === "string" && SOS.bin.hasOwnProperty(argument)) {
        return SOS.bin[argument](null, SOS.man);
    }

    // man
    if (argument === SOS.man) {
        return {
            summary: "Show all available commands or their documentation",
            synopsis: ["man", "man [COMMAND]"],
            description: undefined,
            options: undefined,
            returns: ["When called without arguments it returns the array of all available commands.", "When called with argument COMMAND it will print complete documentation of this command."],
            errors: undefined,
            examples: ["man", "man clear", "man sleep", "man | pretty"],
            see_also: ["echo", "clear", "sleep"]
        };
    }

    var summary = {};
    var k;
    var m;
    for (k in SOS.bin) {
        if (SOS.bin.hasOwnProperty(k)) {
            m = SOS.bin[k](null, SOS.man);
            summary[k] = m.summary;
            // warn about programs without man
            if (!m || !m.summary) {
                SOS.error("Warning: program \"" + k + "\" has no summary");
            }
        }
    }
    return summary;
};


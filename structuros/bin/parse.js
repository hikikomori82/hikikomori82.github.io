// Convert string to structure
/*global JSON5 */

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.parse = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Convert string to structure",
            synopsis: ["command | parse"],
            description: undefined,
            options: undefined,
            returns: ["Structure", "Empty string on error"],
            errors: undefined,
            examples: ["cat \"data.txt\" | parse | filter \"kernel\""],
            see_also: ["cat", "filter"]
        };
    }

    if (typeof input === "string") {
        if (SOS.env.try) {
            try {
                return JSON5.parse(input);
            } catch (e) {
                SOS.error("Error: " + e);
                return "";
            }
        }
        return JSON5.parse(input);
    }
    SOS.error("Error: input is not a string");
    return "";
};

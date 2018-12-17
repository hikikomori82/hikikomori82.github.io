// Return content of a file

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.cat = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return content of a file",
            synopsis: ["cat FILENAME"],
            description: ["Program cat will return content of a file as a string."],
            options: undefined,
            returns: ["String"],
            errors: undefined,
            examples: ["cat \"/etc/motd\"", "cat \"/etc/motd\" | split \"\\n\" | count"],
            see_also: ["editor", "ls", "split"]
        };
    }

    if (typeof argument === "string") {
        var f = SOS.fs.open(argument);
        if (SOS.fs.isFile(f)) {
            return f.content;
        }
        SOS.error("Error: \"" + argument + "\" is not a file");
        return "";
    }
    SOS.error("Error: \"" + argument + "\" is not a filename");
    return "";
};

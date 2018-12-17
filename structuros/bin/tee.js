// Write input to output and file

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.tee = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Write input to output and file",
            synopsis: ["command | tee \"FILENAME\" | command"],
            description: [],
            options: undefined,
            returns: ["Input"],
            errors: undefined,
            examples: ["cat \"/bin/beep.js\" | count | tee \"/home/beep_size.txt\"", "uptime | tee \"all_data.txt\" | filter \"seconds\" | tee \"some_data.txt\" | pretty"],
            see_also: ["cat", "editor", "stat", "ls", "touch", "loginput"]
        };
    }

    // write input to file
    var f = SOS.fs.touch(argument);
    if (!f) {
        SOS.error("Error: cannot open file " + argument);
        return;
    }
    if (!f.hasOwnProperty("content")) {
        console.warn("f", f);
        SOS.error("Error: not a file " + argument);
        return;
    }
    if (typeof input === "string") {
        f.content = input;
    } else {
        f.content = JSON.stringify(input, undefined, SOS.env.indent);
    }
    SOS.fs.save();

    // Return input
    return input;
};

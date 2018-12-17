// Change current directory

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.cd = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Change current directory",
            synopsis: ["cd \"/absolute/path\"", "cd \"relative/path\"", "cd \"..\""],
            description: undefined,
            options: undefined,
            returns: ["Current directory"],
            errors: undefined,
            examples: ["cd \"/home/mydir\"", "cd \"..\"", "cd \"mydir\""],
            see_also: ["ls", "pwd"]
        };
    }

    // get path
    var path = typeof argument === "string"
        ? argument
        : SOS.fs.pwd || "/";

    // remove trailing /
    path = path.replace(/[\/]+$/, "");

    // change directory
    SOS.fs.cd(path);

    // return pwd
    return SOS.fix(SOS.fs.pwd || "/");
};

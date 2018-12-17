// List directory content

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.ls = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "List directory content",
            synopsis: ["ls", "ls [path]"],
            description: undefined,
            options: undefined,
            returns: ["Structure of given path"],
            errors: undefined,
            examples: ["ls", "ls | keys | join \" \""],
            see_also: ["cat", "mkdir", "touch"]
        };
    }

    var path = typeof argument === "string" ? argument : SOS.fs.pwd || "/";
    path = path.replace(/[\/]+$/, "");

    // open path
    var f = SOS.fs.open(path);
    var l = {};

    // ls single_file
    if (SOS.fs.isFile(f)) {
        l[path] = {
            type:"file",
            size:f.content.length,
            created: f.created,
            modified: f.modified
        };
        return l;
    }

    var k;
    for (k in f.items) {
        if (f.items.hasOwnProperty(k)) {
            l[k] = {
                type: SOS.fs.isFile(f.items[k]) ? "file" : "dir",
                size: SOS.fs.isFile(f.items[k]) ? f.items[k].content.length : Object.keys(f.items[k].items).length,
                created: f.items[k].created,
                modified: f.items[k].modified
            };
        }
    }

    return l;
};

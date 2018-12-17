// Return system information

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.uname = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return system information",
            synopsis: ["uname", "uname [FILTER]"],
            description: ["Uname without arguments print all system informations.", "Use filter to filter which system informations you want, see examples for more details."],
            options: undefined,
            returns: ["Complete or filtered system structure"],
            errors: undefined,
            examples: ["uname", "uname \"kernel\"", "uname [\"kernel\", \"version\"]", "uname {kernel:1, version:1, arch:1}"],
            see_also: ["uptime"]
        };
    }

    var ret = {
        kernel: "Hammer",
        hostname: document.location.hostname || "local",
        version: "v0.1",
        build: new Date("2018-12-10T21:38:42Z"),
        arch: "x86_64",
        os: "StructurOS"
    };

    return SOS.filter(ret, argument);
};

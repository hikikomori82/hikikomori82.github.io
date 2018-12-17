// Erase all data and reboot

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.reinstall = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Erase all data and reboot",
            synopsis: ["reinstall"],
            description: ["This program will restore any changes you made to the filesystem and environment."],
            options: undefined,
            returns: ["Empty string"],
            errors: undefined,
            examples: [
                "reinstall"
            ],
            see_also: ["rm", "env"]
        };
    }

    localStorage.clear();
    document.location.reload();

    return "";
};


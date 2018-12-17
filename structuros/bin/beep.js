// Simple audio beep

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.beep = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Simple audio beep",
            synopsis: ["beep", "beep {seconds: VALUE}", "beep VALUE"],
            description: [
                "Beep without argument will beep for 0.5s.",
                "Beep with argument will beep VALUE amount of seconds."
            ],
            options: undefined,
            returns: ["Empty string"],
            errors: undefined,
            examples: ["beep", "beep {seconds: 0.1}", "beep 2", "beep {seconds: 3.14}", "beep {seconds: 10}"],
            see_also: ["echo"]
        };
    }

    // how long
    var duration = 0.5;
    if (argument) {
        duration = typeof argument === "number"
            ? argument
            : (argument.seconds || 0.5);
    }
    duration = parseFloat(duration) * 1000;
    console.log("duration", duration);

    // audio
    var a = document.createElement("audio");
    a.src = "beep.ogg";
    a.loop = true;
    setTimeout(function () {
        a.pause();
    }, duration);
    a.play();
    return "";
};

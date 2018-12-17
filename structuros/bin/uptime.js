// Tell how long the system has been running

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.uptime = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Tell how long the system has been running",
            synopsis: ["uptime", "uptime [FILTER]"],
            description: [
                "Uptime without filter returns all information related to how long the system is running",
                "Uptime with FILTER argument with return only selected information."
            ],
            options: undefined,
            returns: ["Complete or filtered system uptime structure"],
            errors: undefined,
            examples: [
                "uptime",
                "uptime \"seconds\"",
                "uptime [\"minutes\", \"human\"]",
                "uptime {hours:1}",
                "uptime {days:1}",
                "uptime {seconds:1, human:1}"
            ],
            see_also: ["uname"]
        };
    }

    var ret = {
        seconds: (Date.now() - SOS.startAt) / 1000,
        minutes: (Date.now() - SOS.startAt) / 1000 / 60,
        hours: (Date.now() - SOS.startAt) / 1000 / 60 / 60,
        days: (Date.now() - SOS.startAt) / 1000 / 60 / 60 / 24,
        start: new Date(SOS.startAt),
        start_ms: SOS.startAt,
        now: new Date(),
        now_ms: Date.now()
    };
    var m = ret.seconds / 60;
    ret.short = ret.seconds > 60
        ? m.toFixed(0) + "m up"
        : ret.seconds.toFixed(0) + "s up";
    ret.human = ret.seconds > 60
        ? m.toFixed(0) + " minutes up"
        : ret.seconds.toFixed(0) + " seconds up";
    return SOS.filter(ret, argument);
};


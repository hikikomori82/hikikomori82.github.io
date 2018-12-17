// Return argument

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.echo = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Return argument",
            synopsis: ["echo", "echo ARGUMENT"],
            description: [
                "Echo without argument will return empty string.",
                "Echo with argument will return it. Because all return values are printed on terminal it will simply appear on screen."
            ],
            options: undefined,
            returns: ["Argument or empty string"],
            errors: undefined,
            examples: ["echo", "echo \"hello world\"", "echo {text: \"hello world\"}", "echo [1, \"foo\", 3.14, true]", "echo {a:2, b:3, c:4}"],
            see_also: ["clear"]
        };
    }

    if (argument === "" || argument === undefined || argument === null) {
        return "";
    }

    // Return argument
    return SOS.fix(argument);
};

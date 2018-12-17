// Simple text editor

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.editor = function (input, argument) {
    "use strict";
    SOS.unused(input);

    // man
    if (argument === SOS.man) {
        return {
            summary: "Simple text editor",
            synopsis: ["editor FILENAME"],
            description: [
                "Editor will open file in a text editor. If you edit source in /bin and save it using F2 it is automatically evaluated, all files in /bin are evaluated at start."
            ],
            options: undefined,
            shortcuts: {
                "F2": "Save file",
                "Esc": "Exit"
            },
            returns: ["Empty string"],
            errors: undefined,
            examples: ["editor \"/etc/motd\"", "editor \"/home/todo.txt\"", "edit \"/bin/hello.js\""],
            see_also: ["echo", "cat", "cp", "mv", "touch"]
        };
    }

    SOS.editor.open(argument);
    return "";
};

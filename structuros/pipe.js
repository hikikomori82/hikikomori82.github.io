// Parser of commands split by | character, e.g.: uname | filter {kernel:1, version:1} | pretty

var SOS = window.SOS || {};

SOS.pipe = function (text) {
    // Split text into multiple commands separated by |
    "use strict";
    console.log("pipe text", text);
    if (text === "") {
        return [];
    }
    var i;
    var commands = text.split("|");
    var all;
    var command;
    var a;
    var ia;
    var p = [];
    var data;
    // split commands into command, input, argument
    for (i = 0; i < commands.length; i++) {
        all = commands[i].trim();
        a = all.indexOf(" ");
        command = all.substr(0, a > 0 ? a : all.length);
        ia = all.substr(a > 0 ? a + 1 : all.length);
        ia = SOS.split(ia, command);
        if (!ia) {
            return;
        }
        if (ia.length === 1) {
            p.push({command: command, input: undefined, argument: ia[1]});
        } else {
            p.push({command: command, input: ia[0], argument: ia[1]});
        }
    }
    // run all commands and pass output of first to input of second
    data = p[0].input;
    SOS.pipePreviousCommand = "";
    while (p.length > 0) {
        command = p.shift();
        console.log("pipe cmd", command.command, "input", data, "arg", command.argument);
        if (SOS.bin.hasOwnProperty(command.command)) {
            data = SOS.bin[command.command](data, command.argument);
            SOS.pipePreviousCommand = command.command;
        } else {
            SOS.error("Error: command \"" + command.command + "\" not found");
            return;
        }
        console.log("pipe data", data);
    }
    return data;
};


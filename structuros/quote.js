// Guess where the quotes should be so that user can type: cd .., mkdir foo, filter kernel
// NOTE: proper argument splitter will make guessing quotes obsolete, this is just a quick and dirty hack

var SOS = window.SOS || {};

SOS.quote = function (argument, command) {
    // Return string if argument is string, undefined otherwise
    "use strict";
    console.log("quote", argument);

    // don't quote numbers
    if (argument.match(/^[\-0-9.e]+$/)) {
        return argument;
    }

    // eol
    if (argument === "\\n") {
        return "\n";
    }

    // don't quote boolean
    if (argument === "true" || argument === "false") {
        return argument;
    }

    // quote single word
    if (argument.match(/^[a-zA-Z0-9_]+$/)) {
        return argument;
    }

    // quote paths
    if (argument === "..") {
        return argument;
    }
    if (argument.match(/^[\/a-zA-Z0-9_.]+$/)) {
        return argument;
    }

    // allow certain chars in join
    var allowed = [",", ".", "|", "\\n", "~", "\\\\n"];
    if (command === "join" && allowed.indexOf(argument) >= 0) {
        return argument;
    }

    return undefined;
};


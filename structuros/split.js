// Split string with 2 structures into array of 2 structures
/*global window, JSON5 */

var SOS = window.SOS || {};

SOS.split = function (text, command) {
    "use strict";
    // split string with 2 structures into array of 2 structures
    // FIXME: this will fail in it contains string with }{ in it, this is only for testing purposes, proper splitter is necessary!
    //console.log("split", text);

    var s = text.trim();
    var a = s.charAt(0);
    var b = s.charAt(s.length - 1);
    var ab;

    // empty string
    if (!text) {
        return [null, null];
    }

    // maybe it is single structure
    try {
        ab = JSON5.parse(text);
        return [null, ab];
    } catch (ignore) {
    }

    // number number
    if (s.match(/[\-0-9.e+]+[\u0020]+[\-0-9.e+]+/)) {
        ab = s.split(/[\u0020]+/);
        //console.log("o", ab);
        return ab;
    }
    // * boolean
    if (s.match(/[\u0020]*(true|false)$/)) {
        ab = s.split(/[\u0020]*(true|false)$/);
        ab.pop();
        //console.log("o", ab);
        return ab;
    }
    // boolean *
    if (s.match(/^(true|false)[\u0020]*/)) {
        ab = s.split(/^(true|false)[\u0020]*/);
        if (ab[0] === "") {
            ab.shift();
        }
        //console.log("o", ab);
        return ab;
    }

    // combinations
    if (a === "{" && b === "}") {
        ab = "[" + text.replace(/\}[\u0020]*\{/g, "},{") + "]";
    }
    if (a === "\"" && b === "\"") {
        ab = "[" + text.replace(/"[\u0020]*"/g, "\",\"") + "]";
    }
    if (a === "{" && b === "\"") {
        ab = "[" + text.replace(/\}[\u0020]*"/g, "},\"") + "]"; // "
    }
    if (a === "\"" && b === "}") {
        ab = "[" + text.replace(/"[\u0020]*\{/g, "\",{") + "]"; // "
    }
    if (a === "[" && b === "}") {
        ab = "[" + text.replace(/\][\u0020]*\{/g, "],{") + "]";
    }
    if (a === "[" && b === "\"") {
        ab = "[" + text.replace(/\][\u0020]*"/g, "],\"") + "]"; // "
    }
    if (a === "\"" && b === "]") {
        ab = "[" + text.replace(/"[\u0020]*\[/g, "\",[") + "]"; // "
    }
    if (a === "{" && b === "]") {
        ab = "[" + text.replace(/\}[\u0020]*\[/g, "},[") + "]";
    }
    if (a === "{" && b === "]") {
        ab = "[" + text.replace(/\}[\u0020]*\[/g, "},[") + "]";
    }
    if (ab) {
        //console.warn("ab", ab);
        ab = JSON5.parse(ab);
        //console.log("o", ab);
        return ab;
    }

    // last resort is try to quote it
    var q = SOS.quote(s, command);
    if (q !== undefined) {
        return [null, q];
    }

    SOS.error("SplitError: cannot split 2 structures: " + text);
};

// Small unit test for split
try {
    SOS.split("{a: 1} {b: 2}");
    SOS.split("\"hello\" {c:2}");
    SOS.split("{a: 1} \"banana is yellow\"");
    SOS.split("\"hello\" {c:2}");

    SOS.split("23 true");
    SOS.split("23.4 false");
    SOS.split("-12.3e+5 true");
    SOS.split("{s:2} false");
    SOS.split("[2,3,4] true");
    SOS.split("\"hello world\" true");

    SOS.split("true 23");
    SOS.split("false 23.4");
    SOS.split("true -12.3e+5");
    SOS.split("false {s:2}");
    SOS.split("true [2,3,4]");
    SOS.split("false \"hello world\"");

    SOS.split("23 44.5");
    SOS.split("-13.5e10 +12.65e-10");
    SOS.split("{a: 1} \"banana is { c: \\\"23\\\" } yellow\"");
    SOS.split("1 false");
    SOS.split("\"true\" true");
    SOS.split("[1, 2] {b: 2}");
    SOS.split("[2, 3] \"banana [is] yellow\"");
    SOS.split("{arr: [1, {two: 2, s: \"hello }} world\"}]} \"bar\"");
    SOS.split("\"hello\" [3, 4, \"[{5}]\", 6]");

} catch (e) {
    console.error("SOS.split unit test failed: " + e);
}


// Pretty print structure

var SOS = window.SOS || {};
SOS.bin = SOS.bin || {};

SOS.bin.pretty = function (input, argument) {
    "use strict";

    // man
    if (argument === SOS.man) {
        return {
            summary: "Pretty print structure",
            synopsis: ["command | pretty"],
            description: undefined,
            options: undefined,
            returns: ["String with pretty printed structure"],
            errors: undefined,
            examples: [
                "logcat | tail 3 | pretty",
                "uname | pretty"
            ],
            see_also: ["logcat", "filter"]
        };
    }

    var s = "                                       ";
    var default_indent = s.substr(0, SOS.env.indent);

    function maxKeyLength(obj) {
        // find length of a longest key
        var keys = Object.keys(obj);
        if (keys.length === 0) {
            return 0;
        }
        return keys.reduce(function (a, b) {
            return a.length < b.length ? b : a;
        }).length;
    }

    function one(obj, indent, out) {
        // recursively print
        var k;
        var m;
        var i;
        var pref;
        m = maxKeyLength(obj) + 1;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                // date
                if (Object.prototype.toString.call(obj[k]) === "[object Date]") {
                    out.push(indent + k + s.substr(0, m - k.length) + "= " + obj[k].toISOString());
                    continue;
                }
                // array
                if (Array.isArray(obj[k])) {
                    pref = indent + k + s.substr(0, m - k.length);
                    out.push(pref);
                    one(obj[k], s.substr(0, indent.length + SOS.env.indent), out);
                    continue;
                }
                // object
                if (typeof obj[k] === "object") {
                    out.push(indent + k + s.substr(0, m - k.length));
                    one(obj[k], s.substr(0, indent.length + SOS.env.indent), out);
                    continue;
                }
                // values
                if (Array.isArray(obj)) {
                    out.push(indent + s.substr(0, m) + "- " + obj[k]);
                } else {
                    out.push(indent + k + s.substr(0, m - k.length) + "= " + obj[k]);
                }
                continue;
            }
        }
        return out;
    }

    return one(input, "", []).join("\n");
};


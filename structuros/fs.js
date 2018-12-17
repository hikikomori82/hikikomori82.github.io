// Filesystem

var SOS = window.SOS || {};

SOS.fs = (function SosFs() {
    "use strict";
    var that = {};
    that.pwd = "/home";

    // Load tree
    that.tree = localStorage.hasOwnProperty("FS")
        ? JSON.parse(localStorage.getItem("FS"))
        : SOS.fsRoot;

    that.save = function () {
        // Save tree
        localStorage.setItem("FS", JSON.stringify(that.tree));
    };

    that.absolute = function (path, slashed) {
        // Return absolute path
        var p = path.trim().split("/");
        var i;
        var a;
        // apply pwd
        if (p[0] !== "") {
            a = that.pwd.split("/");
            for (i = 0; i < a.length; i++) {
                p.splice(i, 0, a[i]);
            }
        }
        // fix ..
        for (i = 0; i < p.length; i++) {
            if (p[i] === "..") {
                p.splice(i - 1, 2);
                i-= 2;
            }
        }
        return slashed ? p.join("/") : p;
    };

    that.open = function (path) {
        // Return file or dir
        var p = that.absolute(path);
        var i;
        var o = that.tree;
        for (i = 1; i < p.length; i++) {
            if (o && o.items) {
                o = o.items;
            }
            o = o[p[i]];
        }
        return o;
    };

    that.mkdir = function (path) {
        // Create directory
        var p = that.absolute(path);
        console.log("mkdir", p);
        var i;
        var d = that.tree;
        for (i = 1; i < p.length; i++) {
            if (d.items[p[i]] && !d.items[p[i]].items) {
                SOS.error("Error: not a directory: " + d.items[p[i]]);
                return;
            }
            if (!d.items[p[i]]) {
                console.log("creating dir", p[i]);
                d.items[p[i]] = {
                    items: {},
                    created: Date.now(),
                    updated: Date.now()
                };
                that.save();
            }
            d = d.items[p[i]];
            console.log("pi", p[i], "d", d);
        }
        return d;
    };

    that.touch = function (path) {
        // Create empty file if it doesn't exist
        var p = that.absolute(path);
        console.log("touch", p);
        // make it's path
        var d = that.mkdir(p.slice(0, -1).join("/"));
        if (!d) {
            return;
        }
        // touch file
        console.log("d", d);
        if (d.items[p[p.length - 1]]) {
            console.log("already exists");
            d.items[p[p.length - 1]].modified = Date.now();
        } else {
            d.items[p[p.length - 1]] = {content: "", created: Date.now(), modified: Date.now()};
            console.log("created");
            that.save();
        }
        var f = that.open(p.join("/"));
        return f;
    };

    that.rm = function (path) {
        // Remove file
        var p = that.absolute(path);
        var parent = that.open(p.slice(0, -1).join("/"));
        var fn = p.slice(-1)[0];
        console.log("rm", p, parent, fn);
        if (parent && parent.items && parent.items.hasOwnProperty(fn)) {
            var o = parent.items[fn];
            delete parent.items[fn];
            that.save();
            return o;
        }
        SOS.error("Error: cannot remove " + path);
        return "";
    };

    that.cp = function (src, dst) {
        // Copy file
        var s = that.absolute(src);
        var d = that.absolute(dst);
        console.log("cp", s, "to", d);
        var sf = that.open(src);
        var df = that.open(dst);
        console.log("sf", sf, "df", df);
        if (!df) {
            // copy to new file/dir
            df = that.touch(dst);
            if (sf.content) {
                // file
                df.content = sf.content;
                df.modified = Date.now();
            } else {
                // dir
                delete df.content;
                df.items = JSON.parse(JSON.stringify(sf.items));
                df.created = Date.now();
                df.modified = Date.now();
            }
            return "";
        }
        console.log("df", df);
        // copy to existing file/dir
        if (df.content) {
            // file
            df.content = sf.content;
            df.modified = Date.now();
        } else {
            // dir (cp /bin/beep.js /home/food)
            var fn = s.slice(-1)[0];
            console.log("fn", fn, df.items);
            df.items[fn] = JSON.parse(JSON.stringify(sf));
            df.modified = Date.now();
        }
    };

    that.mv = function (src, dst) {
        // Move file
        that.cp(src, dst);
        that.rm(src);
    };

    that.cd = function (path) {
        // Change current directory
        var a = that.absolute(path);
        console.log("cd", a);
        var i;
        var cur = that.tree;
        for (i = 1; i < a.length; i++) {
            if (cur.items.hasOwnProperty(a[i])) {
                cur = cur.items[a[i]];
            } else {
                SOS.error("Error: invalid path " + path);
                return;
            }
        }
        that.pwd = a.join("/");
        return cur;
    };

    that.isFile = function (obj) {
        // Return true if object is file
        return typeof obj === "object" && typeof obj.content === "string";
    };

    that.isDir = function (obj) {
        // Return true if object is directory
        return typeof obj === "object" && typeof obj.items === "object";
    };

    that.binToBin = function () {
        // Add SOS.bin commands to /bin dir
        console.warn("binToBin");
        var k;
        var s;
        var changed = 0;
        for (k in SOS.bin) {
            if (SOS.bin.hasOwnProperty(k)) {
                if (!that.tree.items.bin.items.hasOwnProperty(k + ".js")) {
                    that.tree.items.bin.items[k + ".js"] = {
                        created: Date.now(),
                        updated: Date.now(),
                        content: [
                            "// " + SOS.bin[k](SOS.man, SOS.man).summary,
                            "",
                            "var SOS = window.SOS || {};",
                            "SOS.bin = SOS.bin || {};",
                            "",
                            "SOS.bin." + k + " = " + SOS.bin[k].toString() + ";"
                        ].join("\n")
                    };
                    changed++;
                }
            }
        }
        if (changed > 0) {
            that.save();
            console.log("Saved", changed, " commands to bin/*.js");
        }
        // evaluate all files in bin in case user changed them or added their own
        var w = window;
        for (k in that.tree.items.bin.items) {
            if (that.tree.items.bin.items.hasOwnProperty(k)) {
                s = that.tree.items.bin.items[k].content;
                try {
                    w.eval(s);
                } catch(e) {
                    SOS.error("Error: in /bin/" + k + " - " + e);
                }
            }
        }
    };

    that.autocomplete = function (text) {
        // Return autocompleted path (I don't like this code, it was just last minute afterthought)
        text = text.trim();
        var s = text.split(" ").slice(-1)[0].replace(/^"/, ""); // "

        // find highest path
        var path = "";
        var ss;
        if (SOS.fs.absolute(s).length > 1) {
            ss = s;
            var f;
            while (ss.length > 1) {
                ss = ss.substr(0, ss.length - 1);
                f = SOS.fs.open(ss);
                //console.log("ss", ss, "f", f);
                if (f) {
                    path = ss;
                    //console.error("path", path, "ss", ss, "s", s);
                    s = s.substr(ss.length + 1);
                    //console.error("s2", s);
                    //s = ss.substr(ss.length + 1);
                    break;
                }
            }
        }

        // search dir for candidates
        var c;
        try {
            c = Object.keys(SOS.bin.ls(null, ss));
        } catch (e) {
            c = Object.keys(SOS.bin.ls(null, null));
        }

        // find matching
        console.log("s", s, "c", c);
        var matching = [];
        var i;
        var z;
        for (i = 0; i < c.length; i++) {
            //console.log("test", c[i], "sss", ss + "/" + s);
            if (c[i].startsWith(s)) {
                matching.push(c[i]);
            } else {
                // /b --> /bin
                z = "/" + c[i];
                if (z.startsWith(s)) {
                    matching.push(z);
                }
            }
        }
        //console.warn("f.ac text=", text, "s=", s, "c=", c, "matching=", matching);

        // one matching
        if (matching.length === 1) {
            return text.substr(0, text.length - s.length) + matching[0];
        }

        // multiple matching
        SOS.history.echo(text);
        SOS.echo(matching.join("\t"));
        SOS.focus();
    };

    return that;
}());

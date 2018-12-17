// Command history

var SOS = window.SOS || {};

SOS.history = (function SosHistory() {
    // Command history
    "use strict";
    var that = {};
    that.items = [""];
    that.index = 1;
    that.cmd = null;

    that.end = function () {
        // move cursor to the end
        if (that.cmd.textContent !== "") {
            document.getSelection().collapse(that.cmd, 1);
        }
    };

    that.echo = function (cmd) {
        // Add current command to standard output (before command's output)
        var a;
        var c;
        var old = document.getElementById("old");
        a = document.createElement("div");
        a.textContent = cmd ? (SOS.env.ps1.replace("~", SOS.fs.pwd)) : "";
        a.style.color = SOS.env.ps1color;
        old.appendChild(a);
        c = document.createElement("span");
        c.textContent = cmd;
        c.style.color = "silver";
        a.appendChild(c);
    };

    that.add = function (cmd) {
        // Add command to the history
        if (that.items[that.index - 1] === cmd) {
            return;
        }
        if (that.items[that.index] === cmd) {
            that.index++;
            return;
        }
        that.items.splice(that.index, 0, cmd);
        that.index++;
    };

    that.complete = function (text) {
        // Command name autocomplete
        if (!text) {
            that.echo("commands");
            SOS.echo(Object.keys(SOS.bin).sort().join("\t"));
            return Object.keys(SOS.bin);
        }

        // find word before cursor
        var k;
        var sel = window.getSelection();
        var cur = text.length;
        var prefix = "";
        if (sel.rangeCount) {
            cur = sel.getRangeAt(0).startOffset;
            prefix = text.substr(0, cur);
        }

        // find matching commands
        var a = [];
        console.log("complete '" + prefix + "'");
        for (k in SOS.bin) {
            if (SOS.bin.hasOwnProperty(k)) {
                if (k.startsWith(text.trim())) {
                    a.push(k);
                }
            }
        }

        // one command
        if (a.length === 1) {
            that.cmd.textContent = a[0] + " ";
            that.end();
            return;
        }

        // multiple commands
        if (a.length > 1) {
            that.echo(text);
            SOS.echo(a.join("\t"));
            SOS.focus(true);
            return;
        }

        // autocomplete paths in fs
        var s = SOS.fs.autocomplete(text);
        if (s) {
            that.cmd.textContent = s;
            SOS.focus(true);
            return s;
        }
    };

    window.addEventListener("keydown", function (event) {
        //console.log(event.key);
        if (SOS.editor.visible) {
            return;
        }

        // previous history command
        if (event.key === "ArrowUp") {
            event.preventDefault();
            that.index--;
            if (that.index < 0) {
                that.index = -1;
                that.cmd.textContent = "";
                return;
            }
            that.cmd.textContent = that.items[that.index];
            that.end();
            that.cmd.scrollIntoView();
        }

        // next history command
        if (event.key === "ArrowDown") {
            event.preventDefault();
            that.index++;
            if (that.index >= that.items.length) {
                that.index = that.items.length;
                that.cmd.textContent = "";
                return;
            }
            that.cmd.textContent = that.items[that.index];
            that.end();
            that.cmd.scrollIntoView();
        }

        // tab code completion
        if (event.key === "Tab") {
            that.complete(that.cmd.textContent);
            event.preventDefault();
        }

    }, true);

    window.addEventListener("DOMContentLoaded", function () {
        that.cmd = document.getElementById("cmd");
    });

    return that;
}());


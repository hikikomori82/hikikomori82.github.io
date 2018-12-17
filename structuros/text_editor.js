// Text editor
/*global confirm */

var SOS = window.SOS || {};

SOS.editor = (function SosTextEditor() {
    "use strict";
    var that = {};
    that.visible = false;
    that.file = null;
    that.changed = false;

    window.addEventListener("DOMContentLoaded", function () {
        that.editor = document.getElementById("editor");
        that.editor_text = document.getElementById("editor_text");
        that.editor_text.addEventListener("input", function () {
            that.changed = true;
        });
    });

    window.addEventListener("keyup", function (event) {
        // Handle special keys

        // esc = exit
        if (that.visible && event.key === "Escape") {
            event.preventDefault();
            if (that.changed) {
                if (!confirm("Really exit without saving the changes?")) {
                    return;
                }
            }
            that.editor.style.display = "none";
            that.visible = false;
            SOS.focus();
            return;
        }

        // f2 = save
        if (that.visible && event.key === "F2") {
            that.file.content = that.editor_text.value;
            SOS.fs.save();
            that.changed = false;
            // if edited file was in bin compile it now
            if (that.path.startsWith("/bin/")) {
                var w = window;
                try {
                    w.eval(that.editor_text.value);
                } catch (e) {
                    alert(e + "\n" + e.stack);
                    console.trace();
                    throw e;
                }
            }
            return;
        }
    });

    that.open = function (path) {
        // Open file in editor
        that.file = SOS.fs.touch(path);
        if (that.file.items) {
            SOS.error("Error: cannot edit directory, only files");
            return;
        }
        that.path = path;
        that.visible = true;
        that.editor.style.display = "flex";
        that.editor_text.value = that.file.content;
        that.changed = false;
        that.editor_text.focus();
        // ff fix
        setTimeout(function () {
            document.getElementById("editor_text").focus();
        }, 300);
    };


    return that;
}());


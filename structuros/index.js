// Main terminal window

var SOS = window.SOS || {};

SOS.cmd = null;

function onCmdKeyPress(event) {
    // Run command pipe when user press enter
    "use strict";
    var data;
    if (SOS.editor.visible) {
        return;
    }

    if (event.key === "Enter") {
        event.preventDefault();
        var s = SOS.cmd.textContent.trim();
        SOS.history.add(s);
        SOS.history.echo(s || " ");
        if (s !== "") {
            if (SOS.env.try) {
                try {
                    data = SOS.pipe(s);
                    SOS.echo(data);
                } catch (e) {
                    SOS.error("Error: " + e);
                }
            } else {
                data = SOS.pipe(s);
                SOS.echo(data);
            }
        }
        SOS.cmd.textContent = ""; // "" acts weird in ff
        SOS.focus();
    }
}

/*
window.addEventListener("error", function (e) {
    "use strict";
    console.error("error: " + e.message + " - " + e.filename + ":" + e.lineno + ":" + e.colno);
}, false);
*/

window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    SOS.startAt = Date.now();
    // replay env
    SOS.bin.env(null, SOS.bin.env());
    // command input
    SOS.cmd = document.getElementById("cmd");
    SOS.cmd.contentEditable = true;
    SOS.cmd.addEventListener("keypress", onCmdKeyPress, true);
    // fs - uncomment next line if you develop from disk
    SOS.fs.binToBin();
    // /etc/motd
    SOS.echo(SOS.pipe("cat \"/etc/motd\""));
    // keep focus in input when user click elsewhere
    window.addEventListener("click", function (event) {
        console.log("click", event.target);
        if (event.target === document.body || event.target.id === "out") {
            SOS.focus();
        }
    });
    SOS.focus(SOS.cmd.textContent.length > 1);
});


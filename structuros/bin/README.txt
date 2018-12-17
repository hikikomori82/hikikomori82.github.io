Variables:

SOS                 - global object with StructurOS stuff

SOS.bin             - object with all runnable programs (e.g. SOS.bin.uname)

SOS.man             - global "constant" object, if passed to program as argument
                      it must return it's man structure. Used by "man COMMAND"

SOS.unused(...)     - this function does nothing, can be used to get rid of
                      linter warning about unused variables

SOS.filter(i,a)     - filter input using argument (now that there is separate
                      filter command it is not as necessary anymore)

SOS.fix(x)          - if x is string, return "x", otherwise return x, use for
                      commands that may return string but needs to be pipeable,
                      e.g. apple is not valid structure, "apple" is. Not sure
                      if it is still necessary.

SOS.error(message)  - add message to standard error output

SOS.echo(message)   - add message to standard output (return values are
                      automatically in terminal's stdout so you normally don't
                      need this)

SOS.env             - environment variables


When you create new command, add it to the index.html:

    <script type="text/javascript" src="bin/your_new_command.js"></script>

IMPORTANT: if you change command on disk (e.g. /bin/beep.js) you will not see 
change because it is also in filesystem and filesystem has preference (so that
users can edit their commands in OS itself). Use reinstall command to load
disk version of the command to the filesystem, or disable binToBin call in
index.js.

# StructurOS - Everything is a structure #

StructurOS is research project whose goals are to explore behavior, benefits and
limitations of GNU-like system where program's inputs and outputs are structures
instead of strings.

It's current version is sumulator of a terminal that can run in browser with
30+ commands including text editor. It support pipes and has simple persistent
filesystem using localStorage, You can also define your own commands in JS and
save them in /bin, or you can edit existing commands.

Try the [online demo](http://hikikomori82.github.io/StructurOS)

## Examples ##

    guest@local:/home$ uname
    {
        "kernel": "Hammer",
        "hostname": "local",
        "version": "v0.1",
        "build": "2018-12-10T21:38:42.000Z",
        "arch": "x86_64",
        "os": "StructurOS"
    }

    guest@local:/home$ uname | filter {kernel:1, version:1} | values | join " "
    Hammer v0.1

    guest@local:/home$ uptime | tee "all_data.txt" | filter "seconds" | tee "some_data.txt" | pretty
    seconds = 141.183

    guest@local:/home$ env {fontSize:"14px", indent:2}
    {
      "try": true,
      "ps1": "guest@local:~$ ",
      "ps1color": "lime",
      "inputColor": "yellow",
      "indent": 2,
      "color": "white",
      "backgroundColor": "black",
      "backgroundImage": "url(image/background.png)",
      "fontFamily": "WhiteRabbit.ttf",
      "fontSize": "14px",
      "errors": {
        "Warning": "yellow",
        "Error": "red",
        "SyntaxError": "orange",
        "SplitError": "violet",
        "InputError": "magenta",
        "TypeError": "fuchsia"
      }
    }

    guest@local:/home$ cat /etc/motd | split \n | nth 1 | parse
    Type "man" to show available commands

    guest@local:/home$ man log | filter examples | values | nth 0 | join \n
    log {x:1, y: 2}
    log "hello"

    guest@local:/home$ logcat | tail 2
    [
      {
        "program": "uname",
        "date": 1545069359559,
        "argument": {
          "kernel": "Hammer",
          "version": "v0.1"
        }
      },
      {
        "program": "",
        "date": 1545069372834,
        "argument": "hello world"
      }
    ]


## Commands ##

    guest@local:/home$ man | pretty
    beep      = Simple audio beep
    cat       = Return content of a file
    cd        = Change current directory
    clear     = Clear the terminal screen
    commands  = Array of all available commands
    count     = Count items in input
    cp        = Copy file or directory
    echo      = Return argument
    editor    = Simple text editor
    env       = Show and change environment settings
    examples  = Show all examples from man pages
    filter    = Filter input using argument
    fix       = Convert input string to string structure
    join      = Join array into string using optional glue
    keys      = Return keys of input structure as array of strings
    logcat    = Return entire system log
    loginput  = Add input data to system log
    log       = Add message to system log
    ls        = List directory content
    man       = Show all available commands or their documentation
    mkdir     = Create directory
    mv        = Move file or directory
    nth       = Return Nth item of input array
    parse     = Convert string to structure
    pretty    = Pretty print structure
    pwd       = Return working directory
    reinstall = Erase all data and reboot
    rm        = Remove file or directory
    split     = Split input string by separator
    stat      = Return file or dir details
    tail      = Return last N items of input array
    tee       = Write input to output and file
    touch     = Create file if it does not exist
    uname     = Return system information
    uptime    = Tell how long the system has been running
    values    = Return values of input structure as array of values

## Gotchas and notes ##

- you need to wrap string arguments in quotes. Simple arguments like cd .., 
mkdir foo, editor bar.txt will work, but for more complex stuff use quotes: 
cd "..", mkdir "foo", editor "bar.txt"

- You need to use valid structures in arguments, {foo:1+2} is valid JS, but not
valid structure, use {foo:3}

- If your fork this repo and run it locally, commands from /bin will be loaded
into virtual filesystem. If you modify commands on disk, you will not see the
changes because virtual filesystem has preference. Either use "reinstall"
command or use: env {binFromDisk:true} or comment out SOS.fs.binToBin(); in
index.js.

- Autocomplete is botched on, barely working, buggy, unreliable and not entirely
aware of cursor's position

- For now filesystem saves strings, not structures, feel free to change it. You
  can use "parse" command meanwhile.

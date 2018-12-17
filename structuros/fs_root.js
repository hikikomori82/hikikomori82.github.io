// Default filesystem structure, used in first run and after reinstall

var SOS = window.SOS || {};

SOS.epoch = new Date("2018-12-10T21:38:42.000Z").getTime();

SOS.fsRoot = {
    "items": {
        "bin": {
            "items": {},
            "created": 1544477922000,
            "modified": 1544477922000
        },
        "doc": {
            "items": {
                "philosophy.txt": {
                    "content": "Commands accepts structured data\nCommands returns structured data\nEverything is a structure\nNo more string parsing\nThere is no string\nWake up sheeple!\nStructurOS",
                    "created": 1544477922000,
                    "modified": 1544477922000
                },
                "notes.txt": {
                    "content": "Non-pipe order is currently \"command input argument\" but I haven't decided yet, maybe \"command argument input\" is better, let me know.\nInputs and outputs are structures, not JS! for now you cannot write: echo [1, 2 + 3] because [1, 2+3] is not valid json structure\nI haven't thought yet about how to interrupt pipes",
                    "created": 1544477922000,
                    "modified": 1544477922000
                }
            },
            "created": 1544477922000,
            "modified": 1544477922000
        },
        "etc": {
            "items": {
                "motd": {
                    "content": "Welcome to StructurOS v0.1\nType \"man\" to show available commands\nType \"man \"COMMAND\"\" to show full documentation of COMMAND\n\n",
                    "created": 1544477922000,
                    "modified": 1544477922000
                },
                "readme.txt": {
                    "content": "Here should be the doc...",
                    "created": 1544477922000,
                    "modified": 1544477922000
                }
            },
            "created": 1544477922000,
            "modified": 1544477922000
        },
        "home": {
            "created": 1544477922000,
            "modified": 1544477922000,
            "items": {
                "mydir": {
                    "created": 1544477922000,
                    "modified": 1544477922000,
                    "items": {
                        "food": {
                            "created": 1544477922000,
                            "modified": 1544477922000,
                            "items": {
                                "fruits": {
                                    "created": 1544477922000,
                                    "modified": 1544477922000,
                                    "items": {
                                        "apple.txt": {
                                            "created": 1544477922000,
                                            "modified": 1544477922000,
                                            "content": "apple is green"
                                        },
                                        "banana.txt": {
                                            "created": 1544477922000,
                                            "modified": 1544477922000,
                                            "content": "banana is yellow"
                                        }
                                    }
                                },
                                "vegetables": {
                                    "created": 1544477922000,
                                    "modified": 1544477922000,
                                    "items": {
                                        "carrot.txt": {
                                            "created": 1544477922000,
                                            "modified": 1544477922000,
                                            "content": "carrot is orange"
                                        },
                                        "potato.txt": {
                                            "created": 1544477922000,
                                            "modified": 1544477922000,
                                            "content": "potato is brown"
                                        }
                                    }
                                }
                            }
                        },
                        "foo.txt": {
                            "created": 1544477922000,
                            "modified": 1544477922000,
                            "content": "This is foo.txt"
                        },
                        "bar.txt": {
                            "created": 1544477922000,
                            "modified": 1544477922000,
                            "content": "This is bar.txt"
                        }
                    }
                },
                "demo.js": {
                    "created": 1544477922000,
                    "modified": 1544477922000,
                    "content": "// this is demo.js"
                },
                "hello.js": {
                    "created": 1544477922000,
                    "modified": 1544477922000,
                    "content": "alert('hello')"
                }
            }
        }
    }
};

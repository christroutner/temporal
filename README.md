@chris.troutner/temporal
=======================

Prototype CLI for interacting with [Temporal.cloud](https://temporal.cloud) REST API.


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @chris.troutner/temporal
$ temporal COMMAND
running command...
$ temporal (-v|--version|version)
@chris.troutner/temporal/1.0.0 linux-x64 node-v12.16.1
$ temporal --help [COMMAND]
USAGE
  $ temporal COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`temporal get-key`](#temporal-get-key)
* [`temporal goodbye`](#temporal-goodbye)
* [`temporal hello`](#temporal-hello)
* [`temporal help [COMMAND]`](#temporal-help-command)

## `temporal get-key`

Describe the command here

```
USAGE
  $ temporal get-key

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/get-key.js](https://github.com/christroutner/temporal/blob/v1.0.0/src/commands/get-key.js)_

## `temporal goodbye`

Describe the command here

```
USAGE
  $ temporal goodbye

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/goodbye.js](https://github.com/christroutner/temporal/blob/v1.0.0/src/commands/goodbye.js)_

## `temporal hello`

Describe the command here

```
USAGE
  $ temporal hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/christroutner/temporal/blob/v1.0.0/src/commands/hello.js)_

## `temporal help [COMMAND]`

display help for temporal

```
USAGE
  $ temporal help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->

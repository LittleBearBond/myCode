#!/usr/bin/env node
/**
 * https://www.jianshu.com/p/5d0eef9724e0
 */
/* var name = process.argv[2];
var exec = require('child_process').exec;

var child = exec('echo hello ' + name, function (err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
}); */

/* var name = process.argv[2];
var shell = require("shelljs");

shell.exec("echo hello " + name); */


/* require('shelljs/global');

if (!which('git')) {
    echo('Sorry, this script requires git');
    exit(1);
}

mkdir('-p', 'out/Release');
cp('-R', 'stuff/*', 'out/Release');

cd('lib');

ls('*.js').forEach(function (file) {
    sed('-i', 'v0.1.2', 'v0.1.2', file);
    sed('-i', /.*REMOVE_THIS_LINE.*\n/, '', file);
    sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, cat('macro.js'), file);
});
cd('..');

if (exec('git commit -am "Auto-commit"').code !== 0) {
    echo('Error: Git commit failed');
    exit(1);
} */

/* var argv = require('yargs')
    .alias('n', 'name')
    .alias('h', 'help')
    .alias('p', 'port')
    .argv;

console.log('argv ', argv);
console.log('hello ', argv.n); */

var argv = require('yargs')
    .option('f', {
        alias: 'name',
        demand: true,
        default: 'tom',
        describe: 'your name',
        type: 'string'
    })
    .usage('Usage: hello [options]')
    .example('hello -n tom', 'say hello to Tom')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

console.log('argv ', argv);
console.log('hello ', argv.n);
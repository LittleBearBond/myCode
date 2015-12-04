#! /bin/bash

function logError(){
    echo '$1 please input right dir'
    exit 1
}
function log(){
    echo 'please input dir'
    exit 1
}

function getVersion(){
    if [ "$1" == "" ]
    then
        log
    fi

    if [ -e "$1" ]
    then
        svn info "$1" | grep -i 'Changed Rev' | cut -c19-
    else
        logError $1
    fi
}

if [ $# -eq 0 ]; then
    log
fi

getVersion $1

exit 0

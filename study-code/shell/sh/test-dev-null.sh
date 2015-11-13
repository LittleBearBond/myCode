#!/bin/bash
if grep south TestFile #>/dev/null
then
	echo "Found"
else
	echo "not found"
fi


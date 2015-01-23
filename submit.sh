#!/bin/bash

if [ $# -eq "0" ] ; then
    echo "usage: $0 your-name"
    echo "then email me the tarball"
else
    git archive --prefix=$1/ HEAD >../$1.tar
fi

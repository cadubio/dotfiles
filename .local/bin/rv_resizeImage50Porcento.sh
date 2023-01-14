#!/bin/bash

for i in *.jpg; do
    printf "Redimencionando $i\n"
    convert "$i" -resize 50% "$i"
done

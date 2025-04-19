#!/bin/bash

for i in *.jpg; do
    printf "Redimencionando $i\n"
    magick "$i" -resize 50% "$i"
done

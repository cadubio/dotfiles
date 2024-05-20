#!/bin/bash
# -tile padrão 2x2
DATUAL=`pwd`
cd "$DATUAL"
number=1
echo "Criando Montagem"
for f in *.jpg; do
nome=`basename "$f" .jpg`
coords=`exiftool "$f"  -gpslatitude -gpslongitude -n|cut -d":" -f 2`
   convert "$f" -gravity southeast -pointsize 42 -fill white -annotate +4+4 "$coords" -gravity northeast -pointsize 42 -undercolor white -fill black -annotate +2+2 "$nome" -gravity southwest -pointsize 62 -undercolor white -fill black -annotate +2+2 "$number" miff:- 
((number++))
done | montage -gravity center -tile "$1" -geometry x800+2+2  - montagem.jpg
echo "Feito"


#!/bin/bash
printf "Convertendo extensão dos arquivos para minúscula\n"
rename .JPG .jpg *.JPG
for f in *.jpg; do
	printf "Alterando o tamanho de $f\n"
	convert -resize 1200 "$f" "$f"
done


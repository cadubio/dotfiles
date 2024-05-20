#!/bin/bash
OIFS="$IFS"
IFS=$'\n'
#TODAY=`date +"%Y%m%d"`
DATETIME=$(date +"%Y%m%d_%H%M%S")
#LOGDIR='/path/to/log'
LOG_FILE="ocr_pdfs_${DATETIME}.log"

#exec > >(tee ${LOG_FILE}) 2>&1
exec 3>&1 1>>"${LOG_FILE}" 2>&1
echo ""
echo " Espaços nos nomes das pasta ou dos arquivos " 1>&3
echo " podem atrapalhar a conversão dos PDFs." 1>&3
echo "" 1>&3
echo -n ' Gostaria de trocar espaços por "_" dos nomes das pastas e dos arquivos? (s/n): ' 1>&3
read -rp "Continuar? (S/N): " confirm 

if [ "$confirm" == "s" ] || [ "$confirm" == "S" ];
then
 find . -type f,d -name "* *" | while read -r file; do mv "$file" "${file// /_}"; done
 echo -e "\r Feito!" 1>&3
fi

echo "" 1>&3
echo " Buscar e Converter PDFs que não sejam pesquisáveis?" 1>&3
echo "  Este processo pode demorar bastante, a depender do número" 1>&3
echo -n "  de PDFs a serem convertidos em texto (s/n): " 1>&3
read -rp "Continuar? (S/N): " confirm 

if [ "$confirm" == "s" ] || [ "$confirm" == "S" ];
then

echo ""
# Variáveis
declare -i contaPDFs=0;
declare -i paginas=0;
declare -i totalPaginas=0;
DATUAL=$(pwd);
arquivos=$(find . -type f -name "*.pdf");
Red='\033[0;31m'; 
Pink='\033[33;35m';
RCol='\033[0m';

echo "" 1>&3
echo -e "${Red}Buscando todos PDFs desta pasta/subpastas." 1>&3

for arquivo in $arquivos;
do
  arq=${arquivo/"./"/$DATUAL/}
  texto=$(pdftotext "$arq" -)
  size=${#texto}
  
  if [ "$size" -le 500 ] 
  then
    paginas=$(pdfinfo "$arq" | grep Pages | cut -d":" -f2 | xargs)
    
    echo -e "${RCol}---- Reconhecendo caracteres em ${Pink}${arq##/*/}: ${paginas} páginas ${RCol}----" 1>&3
    echo "---- Reconhecendo caracteres em ${arq##/*/}: ${paginas} páginas ----";

    # verifica se ja existe um arquivo OCR criado. Se não existe faz procedo com o OCR.
    if [ -f "${arq%/*f}/ocr_${arq##/*/}" ]; 
    then 
      echo -e " ---> Arquivo ${Pink}ocr_${arq##/*/} ${RCol}existe!" 1>&3
      echo " ---> Arquivo ocr_${arq##/*/} existe!" 
    else
    contaPDFs+=1;	
    totalPaginas+=paginas;
    TMPD=$(mktemp -d -p "$HOME/tmp")
    
    cd "$TMPD" || exit
    echo -n " Criando imagens em $TMPD ... " 
    pdftoppm -r 300 "$arq" temp
    echo "feito!"
    
    for f in *.ppm; do
      echo 
      echo -en "\r Página ${f//[a-z.-]/} ... " 1>&3
      echo -n " Reconhecendo caracteres na página ${f%.ppm} ..."
      tesseract -l por --dpi 300 "$f" "$f" pdf
    done
    
    echo " feito!" 
    echo "" 
    
    echo -n " Criando PDF pesquisável ... " 
    cd "${arq%/*pdf}" || exit
    pdftk "$TMPD"/*.pdf cat output out.pdf
    gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="ocr_${arq##/*/}" out.pdf
    echo "feito!" 
    
    echo -n " Removendo temporários de $TMPD ... " 
    rm -rf "$TMPD"
    rm -f out.pdf
    echo "feito!"
 
    echo ""
    echo -e "\r ---> Arquivo criado: ${Pink}ocr_${arq##/*/}" 1>&3
    echo " ---> Arquivo criado: ocr_${arq##/*/}"
    echo ""
   fi 
  fi
done

if [ $contaPDFs -gt 0 ];
then
	echo -e " ${Red}Reconhecimento de caracteres realizado em $contaPDFs PDFs ($totalPaginas páginas)" 1>&3
	echo " Reconhecimento de caracteres realizado em $contaPDFs PDFs ($totalPaginas páginas)"
else
 echo -e " ${Red}Todos os PDfs são pesquisáveis!" 1>&3
 echo " Todos os PDfs são pesquisáveis!"
fi

fi # Reconhecer caracteres

echo 1>&3
echo -en " ${RCol}Iniciar a pesquisas pelos termos nos PDFs? (s/n): " 1>&3
echo " ${RCol}Iniciar a pesquisas pelos termos nos PDFs? (s/n): " 
read -r iniciaPesquisa 

if [ "$iniciaPesquisa" == "s" ]
then
  echo ""
  # shellcheck source=$HOME/.local/bin/buscaTermosPDFs.sh
  source "$HOME/.local/bin/buscaTermosPDFs.sh"
  abreMenu 1>&3
else
  exit 1
fi
IFS="$OIFS"

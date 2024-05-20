#!/bin/bash
if [-n "$2"];
then
	framerate=120
else
	framerate="$2"
fi

if [-n "$1"];
then
	printf "aceleraVideo.sh entradata.mp4 120\n"
else 
	ffmpeg -i $1 -map 0:v -c:v copy -bsf:v h264_mp4toannexb raw.h264
	ffmpeg -fflags +genpts -r "$framerate" -i raw.h264 -c:v copy output.mp4
	rm -f raw.h264
	printf "Video acelerado criado: output.mp4"
fi

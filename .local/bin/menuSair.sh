#!/bin/sh

function handle {
  if [[ ${1:0:6} == "submap" ]]; then
    if [[ ${1:8:4} == "sair" ]]; then
      eww --config $HOME/.config/eww open desliga
    else
      eww --config $HOME/.config/eww close desliga
    fi
  fi 
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done

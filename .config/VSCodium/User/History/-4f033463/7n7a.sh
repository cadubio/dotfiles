#!/bin/sh

function handle {
  if [[ ${1:0:12} == "submap" ]]; then
    eww --config $HOME/.config/eww open desliga
  fi
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done

#!/bin/sh

function handle {
  if [[ ${1:0:6} == "submap" ]]; then
    eww --config $HOME/.config/eww open desliga
  fi

  if [[ ${1:12:3} == "esc" ]]; then
    eww --config $HOME/.config/eww close desliga
  fi
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done

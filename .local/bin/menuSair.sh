#!/bin/sh

function handle {
  if [[ ${1:0:6} == "submap" ]]; then
    if [[ ${1:8:4} == "sair" ]]; then
      # eww --config $HOME/.config/eww open desliga
      ags --bus-name powerMenu --config "$HOME/.config/ags/windows/power_menu.js"
    else
      # eww --config $HOME/.config/eww close desliga
      ags --bus-name powerMenu --quit
    fi
  fi 
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done

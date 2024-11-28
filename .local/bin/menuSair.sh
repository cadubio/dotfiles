#!/bin/sh

function handle {
  if [[ ${1:0:6} == "submap" ]]; then
    if [[ ${1:8:4} == "sair" ]]; then
      # eww --config $HOME/.config/eww open desliga
      # agsv1 --bus-name powerMenu --config "$HOME/.config/agsv1/windows/power_menu.js"
      PowerMenu
    else
      # eww --config $HOME/.config/eww close desliga
      # agsv1 --bus-name powerMenu --quit
      ags quit --instance powerMenuInst
    fi
  fi 
}

socat -U - UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read line; do handle $line; done

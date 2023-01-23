#!/bin/sh

function handle {
  
  battery() {
    BAT=`ls /sys/class/power_supply | grep BAT | head -n 1`
    cat /sys/class/power_supply/${BAT}/capacity
  }

  if [[ ${1:0:6} == "submap" ]]; then
    if [[ ${1:8:4} == "sair" ]]; then
      eww --config $HOME/.config/eww open desliga
    else
      eww --config $HOME/.config/eww close desliga
    fi
  fi 

  if [[battery < 67]]; then
	  eww -c $HOME/.config/eww open bat_critica
  fi
}

socat - UNIX-CONNECT:/tmp/hypr/$(echo $HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock | while read line; do handle $line; done

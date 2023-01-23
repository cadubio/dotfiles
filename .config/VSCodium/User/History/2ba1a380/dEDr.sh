#!/bin/bash

battery() {
	BAT=`ls /sys/class/power_supply | grep BAT | head -n 1`
	cat /sys/class/power_supply/${BAT}/capacity
}

battery_stat() {
	BAT=`ls /sys/class/power_supply | grep BAT | head -n 1`
	cat /sys/class/power_supply/${BAT}/status
}

if [[ battery <= 5 && battery_stat != "Charging" ]]; then
	eww --config $HOME/.config/bat/eww open bat_critica
elfi [[ battery_stat == "Charging" ]]; then
	eww --config $HOME/.config/bat/eww close bat_critica
fi

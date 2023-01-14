#!/bin/bash


monitor="$1"
action="$2"

case "$action" in
	on|enable)
		if [[ "$monitor" == "*" ]]; then
			hyprctl dpms on
		else
			hyprctl keyword monitor "${monitor},preferred,auto,1"
		fi
		;;
	off|disable)
		if [[ "$monitor" == "*" ]]; then
			hyprctl dpms off
		else
			hyprctl keyword monitor "${monitor},disable"
		fi
		;;
esac

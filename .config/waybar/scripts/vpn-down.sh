#!/bin/bash
if [[ -d /proc/sys/net/ipv4/conf/tun0 ]]
then
	dunstify "VPN" "Desativando VPN" && nmcli c down ima.carlossiqueira | cut -d"(" -f 1 | while read OUTPUT; do dunstify -u normal "VPN" "$OUTPUT"; done
else
	dunstify "VPN" "VPN Desativada!"
fi

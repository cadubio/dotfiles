#!/bin/bash
if [[ -d /proc/sys/net/ipv4/conf/tun0 ]]
then
	dunstify "VPN" "VPN Ativada!"
else
	dunstify "VPN" "Ativando VPN" && nmcli c up ima.carlossiqueira | cut -d"(" -f 1 | while read OUTPUT; do dunstify -u normal "VPN" "$OUTPUT"; done
fi

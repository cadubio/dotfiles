# Start sway on login on tty1
if [ "$(tty)" = "/dev/tty1" ]; then
#	exec systemd-cat --stderr-priority=warning --identifier=sway sway
	exec Hyprland
fi
#if systemctl -q is-active graphical.target && [[ ! $DISPLAY && $XDG_VTNR -le 3 ]]; then
#  exec sway > /home/cadu/sway.log 2>&1 
#fi

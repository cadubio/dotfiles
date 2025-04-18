# Starts on login on tty1
if uwsm check may-start; then
    exec uwsm start hyprland.desktop
fi
# if [ "$(tty)" = "/dev/tty1" ]; then
# 	exec Hyprland
# fi
#if systemctl -q is-active graphical.target && [[ ! $DISPLAY && $XDG_VTNR -le 3 ]]; then
#  exec sway > /home/cadu/sway.log 2>&1 
#fi

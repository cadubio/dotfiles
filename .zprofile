# Starts on login on tty1
if uwsm check may-start; then
    exec uwsm start hyprland.desktop
fi
#if [[ `uname` == Linux ]] then
#    /usr/bin/keychain $HOME/.ssh/id_rsa
#    source $HOME/.keychain/$HOST-sh
#fi


typeset -U PATH path
#path+=($HOME/.pub-cache/bin local/bin $HOME/Android/flutter/bin $HOME/.pub-cache/bin)
path+=($HOME/.pub-cache/bin)

path=("$HOME/.local/bin" "$path[@]")
#export WAYLAND_DEBUG=1
#export WAYLAND_DISPLAY=1
#
export GDK_BACKEND="wayland"
export XDG_CURRENT_DESKTOP=Hyprland
export XDG_SESSION_TYPE=wayland
export XDG_SESSEIO_DESKTOP=Hyprland
export XDG_CONFIG_HOME=/home/cadu/.config
export LIBSEAT_BACKEND=logind
#
export QT_QPA_PLATFORM="wayland;xcb"
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_WAYLAND_DISABLE_WINDOWDECORATION=1
export QT_QPA_PLATFORMTHEME=qt5ct
#export QT_SCALE_FACTOR=1
#
#export ANDROID_SDK_ROOT=/opt/android-sdk
export ANDROID_AVD_ROOT=/home/cadu/.android/avd
export ANDROID_HOME=/opt/android-sdk
export _JAVA_AWT_WM_NONEREPARENTING=1
#
export CHROME_EXECUTABLE=/usr/bin/chromium
export RSTUDIO_PANDOC=/opt/quarto/bin
export MOZ_ENABLE_WAYLAND=1
#
export POSTGIS_ENABLE_OUTDB_RASTERS=1
export POSTGIS_GDAL_ENABLED_DRIVERS=ENABLE_ALL
export POSTGIS_GDAL_ENABLED_DRIVERS="GTiff PNG JPEG GIF XYZ"
#
export EDITOR="nvim"
export TERMINAL="alacritty"
export BROWSER="firefox"
export READER="okular"
export FILE="ranger"
export CM_LAUNCHER="wofi"
export PATH

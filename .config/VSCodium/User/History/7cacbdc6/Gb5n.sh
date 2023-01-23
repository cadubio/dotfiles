#!/bin/bash

workspaces() {

#define icons for workspaces 1-9
ic=(祿 ﱣ)

unset -v \
  o1 o2 o3 o4 o5 o6 o7 o8 o9 \
  f1 f2 f3 f4 f5 f6 f7 f8 f9

# check if Occupied
for num in $(hyprctl workspaces | grep ID | sed 's/()/(1)/g' | sort | awk 'NR>1{print $1}' RS='(' FS=')'); do 
  export o"$num"="1"
done
 
#check if Focused
for num in $(hyprctl monitors | grep active | sed 's/()/(1)/g' | sort | awk 'NR>1{print $1}' RS='(' FS=')'); do 
  export f"$num"="1"
done

echo 	"(box	:class \"workspaces\" :orientation \"h\" :valign \"center\" :halign \"start\"  :space-evenly \"false\" (button :onclick \"hyprctl dispatch workspace 1\" :class	\"0$o1$f1\"	\"${ic[$f1]}\") (button :onclick \"hyprctl dispatch workspace 2\" :class \"0$o2$f2\"	 \"${ic[$f2]}\") (button :onclick \"hyprctl dispatch workspace 3\" :class \"0$o3$f3\" \"${ic[$f3]}\") (button :onclick \"hyprctl dispatch workspace 4\" :class \"0$o4$f4\"	\"${ic[$f4]}\") (button :onclick \"hyprctl dispatch workspace 5\" :class \"0$o5$f5\" \"${ic[$f5]}\")  (button :onclick \"hyprctl dispatch workspace 6\" :class \"0$o6$f6\" \"${ic[$f6]}\")  (button :onclick \"hyprctl dispatch workspace 7\"	:class \"0$o7$f7\" \"${ic[$f7]}\")  (button :onclick \"hyprctl dispatch workspace 8\" :class \"0$o8$f8\" \"${ic[$f8]}\")  (button :onclick \"hyprctl dispatch workspace 9\" :class \"0$o9$f9\" \"${ic[$f9]}\"))"

}
workspaces
tail -f /tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/hyprland.log | grep --line-buffered "Changed to workspace" | while read -r; do 
workspaces
done

#!/usr/bin/gjs -m

import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar";
import NotificationPopups from "./widget/notifications/NotificationPopups";


App.add_icons("/home/cadu/.config/ags/widget/img")

App.start({
  css: style,
  gtkTheme: "Arc-Dark",
  instanceName: "AppBarAndNotification",
  main: () => App.get_monitors().map((m) => {
    Bar(m)
    NotificationPopups()

  }),
});
#!/usr/bin/gjs -m

import { App } from "astal/gtk3";
import style from "./bateria.scss";
import JanelaBatCritica from "./bateria_critica"


App.add_icons("/home/cadu/.config/ags/widget/img")

App.start({
  css: style,
  gtkTheme: "Arc-Dark",
  instanceName: "BateriaCritica",
  main: () => App.get_monitors().map(JanelaBatCritica),
});
#! /usr/bin/gjs -m
import { App } from "astal/gtk3";
import style from "./style.css";
import OpenScreenCapture from "./OpenScreenCapture";
import CloseScreenCapture from "./CloseScreenCapture";

App.start({
  css: style,
  instanceName: "ScreenCapture",
  gtkTheme: "Arc-Dark",
  main() {
        OpenScreenCapture()
        CloseScreenCapture()
  },
});
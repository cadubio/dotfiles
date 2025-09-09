import app from "ags/gtk4/app";
import style from "./style.css";
import OpenScreenCapture from "./OpenScreenCapture";
import CloseScreenCapture from "./CloseScreenCapture";

app.start({
  css: style,
  instanceName: "System-Screen-Capture",
  gtkTheme: "Adwaita-dark",
  iconTheme: "Adwaita",
  main() {
        OpenScreenCapture()
        CloseScreenCapture()
  },
});
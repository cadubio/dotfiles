import app from "ags/gtk4/app"
import style from "./system_style.scss"
import Bar from "./widget/System_Bar"

app.start({
  instanceName: "System-Bar",
  gtkTheme: "Adwaita-dark",
  iconTheme: "Adwaita",
  css: style,
  main() {
    app.get_monitors().map(Bar)
  },
})

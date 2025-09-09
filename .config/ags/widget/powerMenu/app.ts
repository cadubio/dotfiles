import app from "ags/gtk4/app"
import PowerMenu from "./power_menu"
import style from "./style.css"

app.start({
  instanceName: "System-Power-Menu",
  gtkTheme: "Adwaita-dark",
  iconTheme: "Adwaita",
  css: style,
  main() {
    app.get_monitors().map(PowerMenu)
  },
});
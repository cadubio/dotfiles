import app from "ags/gtk4/app"
import JanelaBatCritica from "./bateria_critica"

app.start({
  instanceName: "System-Bateria-Critica",
  gtkTheme: "Adwaita-dark",
  iconTheme: "Adwaita",
  main() {
    app.get_monitors().map(JanelaBatCritica)
  },
});
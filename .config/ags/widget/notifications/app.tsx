import app from "ags/gtk4/app"
import style from "./style.scss"
import NotificationPopups from "./NotificationPopupsComTimeout"

app.start({
  instanceName: "System-Notification",
  gtkTheme: "Adwaita-dark",
  iconTheme: "Adwaita",
  css: style,
  main() {
    app.get_monitors().map(NotificationPopups)
  },
})

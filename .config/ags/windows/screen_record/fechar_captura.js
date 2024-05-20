import App from "resource:///com/github/Aylur/ags/app.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import icons from "../../icons.js";

const playPause = Widget.Label({
  label: icons.mpris.stopped,
  class_name: "record-fechar-icon",
});

export const Fechar = () =>
  Widget.Window({
    visible: false,
    exclusivity: "normal",
    anchor: ["bottom", "left"],
    name: "record_fechar",
    keymode: "on-demand",
    class_name: "record-fechar-window",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.Quit();
      }),
    child: Widget.Box({
      class_name: "record-fechar-box",
      children: [
        Widget.Button({
          class_name: "record-fechar-btn",
          on_primary_click: () =>
            execAsync(["bash", "-c", "pkill --signal=SIGINT wf-recorder"])
              .then(print)
              .catch(print),
              on_primary_click_release: () => {
                execAsync("dunstify 'Video gravado em /home/cadu/captura'");
                playPause.label = icons.mpris.playing;
              },
          child: playPause,
        }),
      ],
    }),
  });

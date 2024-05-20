import App from "resource:///com/github/Aylur/ags/app.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Gtk30 from "gi://Gtk";

const audio = new Gtk30.CheckButton({label: "Gravar audio"});

export const Abrir = () =>
  Widget.Window({
    visible: true,
    exclusivity: "normal",
    name: "record_abrir",
    keymode: "on-demand",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.Quit();
      }),
    // @ts-ignore
    child: Widget.Box({
      class_name: "record-abrir-box",
      vertical: true,
      children: [
        Widget.Label({ label: "Selecione o monitor" }),
        audio,
        Widget.Box({
          vertical: true,
          children: Hyprland.bind("monitors").transform((monitores) => {
            return monitores.map((monitor) =>
              Widget.Button({
                class_name: "record-abrir-btn",
                child: Widget.Label({
                  class_name: "record-abrir-txt",
                  label: `${monitor.name}`,
                }),
                on_primary_click: () => {
                  print(audio.active)
                  if (audio.active) {
                    execAsync([
                      "bash",
                      "-c",
                      "wf-recorder --audio --file=$HOME/gravacoes/captura-`date +%Y-%m-%d_%H-%M-%S`.mp4 --codec h264_vaapi -d /dev/dri/renderD128 --bframes 2 --output " +
                        `${monitor.name}`,
                    ])
                      .then((out) => print(out))
                      .catch((err) => print(err));
                  } else {
                    execAsync([
                      "bash",
                      "-c",
                      "wf-recorder --file=$HOME/gravacoes/captura-`date +%Y-%m-%d_%H-%M-%S`.mp4 --codec h264_vaapi -d /dev/dri/renderD128 --bframes 2 --output " +
                        `${monitor.name}`,
                    ])
                      .then((out) => print(out))
                      .catch((err) => print(err));
                  }
                },
                on_primary_click_release: () => {
                  App.ToggleWindow("record_abrir");
                  App.ToggleWindow("record_fechar");
                },
              })
            );
          }),
        }),
      ],
    }),
  });

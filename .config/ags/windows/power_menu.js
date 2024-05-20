import App from "resource:///com/github/Aylur/ags/app.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { monitorFile } from "resource:///com/github/Aylur/ags/utils.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import icons from "../icons.js";

const PowerMenu = () =>
  Widget.Window({
    name: "power_window",
    class_name: "power_menu",
    // popup: true,
    exclusivity: "normal",
    keymode: "exclusive",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.Quit()
      }),
    child: Widget.Box({
      class_name: "back_box",
      children: [
        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Button({
              on_primary_click_release: () => execAsync("systemctl poweroff"),
              class_name: "power_btn",
              child: Widget.Icon({
                icon: icons.keyboard.key.d,
                size: 60,
              }),
            }),
            Widget.Label({
              label: "[ desligar ]",
              class_name: "power_txt",
            }),
          ],
        }),

        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Button({
              on_primary_click_release: () => execAsync("systemctl reboot"),
              class_name: "power_btn",
              child: Widget.Icon({
                icon: icons.keyboard.key.r,
                size: 60,
              }),
            }),
            Widget.Label({
              label: "[ reiniciar ]",
              class_name: "power_txt",
            }),
          ],
        }),

        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Button({
              on_primary_click_release: () =>
                Hyprland.messageAsync(`dispatch exit`),
              class_name: "power_btn",
              child: Widget.Icon({
                icon: icons.keyboard.key.l,
                size: 60,
              }),
            }),
            Widget.Label({
              label: "[ logout ]",
              class_name: "power_txt",
            }),
          ],
        }),

        Widget.Box({
          vertical: true,
          vpack: "center",
          children: [
            Widget.Button({
              on_primary_click: () =>
                execAsync("ags --bus-name powerMenu --quit"),
              class_name: "power_btn",
              child: Widget.Icon({
                icon: icons.keyboard.key.esc,
                size: 60,
              }),
            }),
            Widget.Label({
              label: "[ sair ]",
              class_name: "power_txt",
            }),
          ],
        }),
      ],
    }),
  });

// .on("key-press-event", (_, event) => {
//   const keyval = event.get_keyval()[1];
//   if (event.get_state()[1] != Gdk.ModifierType.MOD1_MASK) return;
//   switch (keyval) {
//     case Gdk.KEY_Escape:
//       print("esc");
//       execAsync("ags --bus-name powerMenu --quit");
//       break;
//   }
// }),

monitorFile(`${App.configDir}/../css/power_menu.css`, function () {
  App.resetCss();
  App.applyCss(`${App.configDir}/../css/power_menu.css`);
});

App.config({
  style: App.configDir + "/../css/power_menu.css",
  windows: [PowerMenu()],
});

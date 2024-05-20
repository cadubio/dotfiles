import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import App from "resource:///com/github/Aylur/ags/app.js";

const JanelaBatCritica = () =>
  Widget.Window({setup: (selfi) =>
    selfi.keybind("Escape", () => {
      App.Quit();
    })}).hook(
    Battery,
    (self) => {
      if (Battery.percent <= 5 && !Battery.charging) {
        self.visible = true;
      } else {
        self.visible = false;
      }
      self.css =
        "padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;";
      self.name = "bateria-critica";
      self.keymode = "exclusive";

      self.child = Widget.Box({
        spacing: 60,
        vertical: true,
        css: "padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;",
        children: [
          Widget.Label({
            label: "ATENÇÃO !!!",
            css: "font-size: 24px; color: #e9e111;",
          }),
          Widget.Box({
            spacing: 4,
            children: [
              Widget.Icon({
                css: "font-size: 24px",
                icon: Battery.icon_name,
              }),
              Widget.Label({
                label: `Bateria em nível crítico ${Battery.percent}%`,
                css: "font-size: 24px; color: #e94f4f;",
              }),
            ],
          }),
          Widget.Label({
            label: "Conecte o carregador!",
            css: "font-size: 24px; color: #e9e111;",
          }),
        ],
      });
    },
    "changed"
  );

// const JanelaBatCritica = () =>
//   Widget.Window({
//     visible: Battery.bind("percent") <= 5,
//     name: "bateria-critica",
//     popup: true,
//     keymode: "exclusive",
//     child: Widget.Box({
//       spacing: 60,
//       vertical: true,
//       css: "padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;",
//       children: [
//         Widget.Label({
//           label: "ATENÇÃO !!!",
//           css: "font-size: 24px; color: #e9e111;",
//         }),
//         Widget.Box({
//           spacing: 4,
//           children: [
//             Widget.Icon({
//               css: "font-size: 24px",
//               icon: Battery.bind("icon_name"),
//             }),
//             Widget.Label({
//               label: Battery.bind("percent").transform(
//                 (p) => `Bateria em nível crítico ${p}%`
//               ),
//               css: "font-size: 24px; color: #e94f4f;",
//             }),
//           ],
//         }),
//         Widget.Label({
//           label: "Conecte o carregador!",
//           css: "font-size: 24px; color: #e9e111;",
//         }),
//       ],
//     }),
//   });

// const porc = Variable(Battery.bind("percent").transform((p) => `${p}`));

// print(JSON.stringify(porc)["percent"]);

export default {
  // style: App.configDir + '/../css/power_menu.css',
  windows: [JanelaBatCritica()],
};

import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import SystemTray from "resource:///com/github/Aylur/ags/service/systemtray.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import icons from "./icons.js";
import brightness from "./services/brightness.js";
import { monitorFile } from "resource:///com/github/Aylur/ags/utils.js";

// Esquerda
const SysTray = () =>
  Widget.Box({
    class_name: "btn_tray",
    children: SystemTray.bind("items").transform((items) => {
      return items.map((item) =>
        Widget.Button({
          child: Widget.Icon({
            // @ts-ignore
            binds: [["icon", item, "icon"]],
          }),
          on_primary_click: (_, event) => item.activate(event),
          on_secondary_click: (_, event) => item.openMenu(event),
          // @ts-ignore
          binds: [["tooltip_markup", item, "tooltip_markup"]],
        })
      );
    }),
  });

const WindowTitle = () =>
  Widget.Label({
    class_name: "window-title",
    label: Hyprland.active.client.bind("title"),
    truncate: "end",
    max_width_chars: 50,
  });

// Centro
const Workspaces = () =>
  Widget.Box({
    class_name: "workspaces",
    children: Hyprland.bind("workspaces").transform((ws) => {
      return ws
        .filter(({ id }) => id > 0) // não pega special ws
        .sort((a, b) => a.id - b.id)
        .map(({ id }) =>
          Widget.Button({
            on_clicked: () => Hyprland.message(`dispatch workspace ${id}`),
            child: Widget.Label(`${id}`),
            class_name: Hyprland.active.workspace
              .bind("id")
              .transform((i) => `${i === id ? "focused" : ""}`),
          })
        );
    }),
  });

// Direita

// Data e hora
const Clock = () =>
  Widget.Label({
    class_name: "clock",
    setup: (self) =>
      self.poll(1000, (self) => {
        execAsync(["date", "+%I:%M"]).then((hora) => (self.label = hora));
        execAsync(["date", "+%d/%m%n%A"]).then(
          (data) => (self.tooltip_text = data)
        );
      }),
  });

// const Date = () =>
//   Widget.Label({
//     class_name: "clock",
//     setup: (self) =>
//       self.poll(10000, (self) =>
//         execAsync(["date", "+%d/%m/n%A"]).then((data) => (self.label = data))
//       ),
//   });

const cal = () =>
  Widget.Window({
    name: "calendario",
    popup: true,
    exclusivity: "normal",
    keymode: "on-demand",
    anchor: ["top", "right"],
    child: Widget.Box({
      children: [
        Widget.Calendar({
          hexpand: true,
          hpack: "center",
        }),
      ],
      setup: (self) =>
        self.keybind("Escape", () => {
          App.closeWindow("calendario");
        }),
    }),
  });

const Calendario = () =>
  Widget.Button({
    on_primary_click: cal,
    child: Clock(),
  });

const Bateria = () =>
  Widget.Box().hook(
    Battery,
    (self) => {
      self.class_name =
        Battery.percent <= 12 && !Battery.charging
          ? "battery-box-aviso"
          : "battery-box";

      self.visible = Battery.available;
      self.spacing = 2;
      self.children = [
        Widget.Icon({
          class_name: "battery-icon",
          icon: Battery.icon_name,
        }),
        Widget.Label({
          class_name: "battery-txt",
          label: `${Battery.percent}%`,
        }),
      ];
    },
    "changed"
  );

const MicrophoneIndicator = () =>
  Widget.Icon().hook(
    Audio,
    (self) => {
      if (!Audio.microphone) return;

      const { muted, low, medium, high } = icons.audio.mic;
      if (Audio.microphone.stream?.isMuted) return (self.icon = muted);

      /** @type {Array<[number, string]>} */
      const cons = [
        [67, high],
        [34, medium],
        [1, low],
        [0, muted],
      ];
      self.icon =
        cons.find(([n]) => n <= Audio.microphone.volume * 100)?.[1] || "";

      // self.visible = Audio.recorders.length > 0 || Audio.microphone.is_muted;
    },
    "microphone-changed"
  );

const volumeChange = Widget.Revealer({
  reveal_child: false,
  transition_duration: 500,
  transition: "slide_right",
  child: Widget.Box({
    css: "min-width: 120px;",
    children: [
      Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => (Audio.speaker.volume = value),
        setup: (self) =>
          self.hook(
            Audio,
            () => {
              self.value = Audio.speaker?.volume || 0;
            },
            "speaker-changed"
          ),
      }),
    ],
  }),
});

const Volume = () =>
  Widget.EventBox({
    class_name: "volume",
    on_hover: () => (volumeChange.reveal_child = true),
    on_hover_lost: () => (volumeChange.reveal_child = false),
    on_middle_click_release: () => execAsync("pavucontrol"),
    on_secondary_click_release: () => execAsync("easyeffects"),
    child: Widget.Box({
      children: [
        Widget.Icon().hook(
          Audio,
          (self) => {
            if (!Audio.speaker) return;

            const category = {
              101: "overamplified",
              67: "high",
              34: "medium",
              1: "low",
              0: "muted",
            };

            const icon = Audio.speaker.stream?.isMuted
              ? 0
              : [101, 67, 34, 1, 0].find(
                  (threshold) => threshold <= Audio.speaker.volume * 100
                );

            self.icon = `audio-volume-${category[icon]}-symbolic`;
          },
          "speaker-changed"
        ),
        volumeChange,
      ],
    }),
  });

const AudioControl = () =>
  Widget.Box({
    class_name: "audio",
    spacing: 8,
    children: [MicrophoneIndicator(), Volume()],
  });

// Controle do brilho do monitor
const brightnessReveal = Widget.Revealer({
  reveal_child: false,
  transition_duration: 500,
  transition: "slide_right",
  child: Widget.Box({
    css: "min-width: 120px",
    children: [
      Widget.Slider({
        draw_value: false,
        hexpand: true,
        value: brightness.bind("screen"),
        on_change: ({ value }) => (brightness.screen = value),
        setup: (self) =>
          self.hook(
            brightness,
            () => {
              self.value = brightness.screen || 0;
            },
            "changed"
          ),
      }),
    ],
  }),
});

const Brightness = () =>
  Widget.EventBox({
    class_name: "brilho",
    on_hover: () => (brightnessReveal.reveal_child = true),
    on_hover_lost: () => (brightnessReveal.reveal_child = false),
    child: Widget.Box({
      children: [Widget.Icon(icons.brightness.indicator), brightnessReveal],
      tooltip_text: brightness
        .bind("screen")
        .transform((v) => `Brilho: ${Math.floor(v * 100)}%`),
    }),
  });

// Uso da RAM
const divide = ([total, free]) => Math.floor((free / total) * 100);

const ram = Variable(0, {
  poll: [
    2000,
    "free",
    (out) =>
      divide(
        // @ts-ignore
        out
          .split("\n")
          .find((line) => line.includes("Mem.:"))
          .split(/\s+/)
          .splice(1, 2)
      ),
  ],
});

const swap = Variable(0, {
  poll: [
    2000,
    "free",
    (out) =>
      divide(
        // @ts-ignore
        out
          .split("\n")
          .find((line) => line.includes("Swap:"))
          .split(/\s+/)
          .splice(1, 2)
      ),
  ],
});

//'/home/cadu/.config/ags/assets/ram_543279.png'
const Memory = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        label: "RAM",
        class_name: "ram",
      }),
      Widget.Label({
        class_name: "ram-porc",
        label: ram.bind().transform((value) => `${value}%`),
      }),
    ],
  });

  const Swap = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        label: "SWAP",
        class_name: "ram",
      }),
      Widget.Label({
        class_name: "ram-porc",
        label: swap.bind().transform((value) => `${value}%`),
      }),
    ],
  });

  const toggleMem = Widget.Stack({
    children: {
      "mem": Memory(),
      "swap": Swap()
    }
  })

  const MemUse = () => Widget.EventBox({
    on_primary_click: () => {
      if (toggleMem.shown == "mem") {
        toggleMem.shown = "swap";
        
      } else {
        toggleMem.shown = "mem";
      }
    },
    child: toggleMem
  })

// Uso da CPU
const cpu = Variable(0, {
  poll: [
    2000,
    "top -b -n 1",
    (out) =>
      divide([
        100,
        out
          .split("\n")
          .find((el) => el.includes("%CPU(s)"))
          ?.split(/\s+/)[1]
          .replace(",", "."),
      ]),
  ],
});

const Cpu = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        label: "CPU",
        class_name: "cpu",
      }),
      Widget.Label({
        class_name: "cpu-porc",
        label: cpu.bind().transform((value) => `${value}%`),
      }),
    ],
  });

// Uso do disco
const home = Variable("0%", {
  poll: [
    900000,
    "df -h",
    (out) =>
      out
        .split("\n")
        .find((el) => el.includes("/home"))
        ?.split(/\s+/)[4],
  ],
});

const raiz = Variable("0%", {
  poll: [
    900000,
    "df -h",
    (out) =>
      out
        .split("\n")
        .find((el) => el.includes("/dev/sda5"))
        ?.split(/\s+/)[4],
  ],
});

const Home = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        label: "HOME",
        class_name: "home",
      }),
      Widget.Label({
        class_name: "home-porc",
        label: home.bind().transform((value) => `${value}`),
      }),
    ],
  });

  const Raiz = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        label: "RAIZ",
        class_name: "home",
      }),
      Widget.Label({
        class_name: "home-porc",
        label: raiz.bind().transform((value) => `${value}`),
      }),
    ],
  });

  const toggleDisc = Widget.Stack({
    children: {
      "home": Home(),
      "raiz": Raiz()
    }
  })

  const DiscUse = () => Widget.EventBox({
    on_primary_click: () => {
      if (toggleDisc.shown == "home") {
        toggleDisc.shown = "raiz";
        
      } else {
        toggleDisc.shown = "home";
      }
    },
    child:toggleDisc
  })
// const Raiz = () =>
//   Widget.Box({
//     vertical: true,
//     children: [
//       Widget.Label({
//         label: "RAIZ",
//         class_name: "home",
//       }),
//       Widget.Label({
//         class_name: "home-porc",
//         label: raiz.bind().transform((value) => `${value}`),
//       }),
//     ],
//   });

// Rede
const WifiIndicator = () =>
  Widget.Box({
    children: [
      Widget.Icon().hook(Network.wifi, (self) => {
        self.icon = Network.wifi.icon_name;
        self.tooltip_text = `${Network.wifi.ssid}: ${Network.wifi.strength}%`;
      }),
    ],
  });

const WiredIndicator = () =>
  Widget.Box({
    children: [
      Widget.Icon().hook(Network.wifi, (self) => {
        self.icon = Network.wired.icon_name;
        self.tooltip_text = `${Network.wired.state}`;
      }),
    ],
  });

const NetworkIndicator = () =>
  Widget.EventBox({
    on_primary_click_release: () => execAsync("rofi-wifi-menu"),
    child: Widget.Stack({
      children: { wifi: WifiIndicator(), wired: WiredIndicator() },
      shown: Network.bind("primary").transform((p) => p || "wifi"),
    }),
  });

const vpnState = Variable(0, {
  poll: [ 2000, "vpn-state" ]

});

const FortiVpn = () =>
  Widget.Button({
    on_primary_click: () => {
      if (vpnState.getValue() == 0) {
        execAsync("vpn-ciasc")
      }
      else { 
        execAsync("sudo killall -SIGTERM pppd")
      }
    },
    child: Widget.Label({
      class_name: vpnState.bind().transform((n) => n == 0 ? "vpn-off" : "vpn-on"),
      label: "VPN" 
    }),
  });

const VpnBox = () =>
  Widget.Box({
    spacing: 1,
    homogeneous: false,
    vertical: false,
    class_name: "vpnBox",
    children: [
        FortiVpn()
    ]
});

// openfortivpn sslvpn01.ciasc.gov.br:443 --cookie=""

/* Atualização de pacotes */
// pacman
const Updates = () =>
  Widget.Label({
    class_name: "updates",
    setup: (self) =>
      self.poll(600000, (self) =>
        execAsync(["bash", "-c", "checkupdates 2> /dev/null | wc -l"]).then(
          (nPackages) => (self.label = `${nPackages} 󰏔`)
        )
      ),
  });

// AUR
const updatesAUR = Variable(0, {
  poll: [
    600000,
    ["bash", "-c", "auracle outdated 2> /dev/null | wc -l"],
    (nPackages) => Number.parseInt(nPackages),
  ],
});

const Packages = () =>
  Widget.Box({
    children: [Updates()],
    tooltip_text: updatesAUR.bind().transform((value) => `AUR: ${value}`),
  });

export const dpms = Widget.Stack({
  children: {
    ligado: Widget.Label("󰨚"),
    desligado: Widget.Label("󰨙"),
  },
});

globalThis.dpms = dpms;

const Dpms = () =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        class_name: "dpms-txt",
        label: "dpms",
      }),
      Widget.Button({
        on_primary_click_release: () =>
          Hyprland.message("dispatch dpms toggle"), //execAsync(`bash -c "${App.configDir}/scripts/idle_inhibitor toggle"`),
        child: dpms,
        setup: (self) =>
          self.bind("class_name", dpms, "shown", (estado) =>
            estado == "ligado" ? "dpms-on" : "dpms-off"
          ),
      }),
    ],
  });

// const ip = Variable("", {
//   listen: ["bash", "-c", "openfortivpn-webview --url 'https://sslvpn01.ciasc.gov.br:443/remote/saml/start?realm=ima'"]
// })

// Menus
const Left = () =>
  Widget.Box({
    spacing: 8,
    children: [SysTray(), WindowTitle()],
  });

const Center = () =>
  Widget.Box({
    spacing: 8,
    children: [Workspaces()],
  });

const Right = () =>
  Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      VpnBox(),
      Packages(),
      Dpms(),
      Brightness(),
      NetworkIndicator(),
      AudioControl(),
      DiscUse(),
      Cpu(),
      MemUse(),
      Bateria(),
      Calendario(),
    ],
  });

// Menu principal
const Bar = (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      class_name: "center-bar",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });

monitorFile(`${App.configDir}/css/style.css`, function () {
  App.resetCss();
  App.applyCss(`${App.configDir}/css/style.css`);
});

App.config({
  style: App.configDir + "/css/style.css",
  windows: [Bar()],
});

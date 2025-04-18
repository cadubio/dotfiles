import { App } from "astal/gtk3";
import { Variable, GLib, bind, execAsync, exec } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import Battery from "gi://AstalBattery";
import Wp from "gi://AstalWp";
// import Network from "gi://AstalNetwork";
import Tray from "gi://AstalTray";
import Brightness from "./Brigthness";

function SysTray() {
  const tray = Tray.get_default();

  return (
    <box spacing={4}>
      {bind(tray, "items").as((items) =>
        items.map((item) => {
          if (item.iconThemePath) App.add_icons(item.iconThemePath);

          const menu = item.create_menu();

          return (
            <button
              tooltipMarkup={bind(item, "tooltipMarkup")}
              onDestroy={() => menu?.destroy()}
              onClickRelease={(self) => {
                menu?.popup_at_widget(
                  self,
                  Gdk.Gravity.SOUTH,
                  Gdk.Gravity.NORTH,
                  null
                );
              }}
            >
              <icon gIcon={bind(item, "gicon")} />
            </button>
          );
        })
      )}
    </box>
  );
}

// function Wifi() {
//   const { wifi, wired } = Network.get_default();
//   const wifiActive = bind(wifi, "enabled").get();

//   return (
//     <box>
//       <icon
//         tooltipText={wifiActive ? bind(wifi, "ssid").as(String) : "Cabo"}
//         className="Wifi"
//         icon={wifiActive ? bind(wifi, "iconName") : bind(wired, "iconName")}
//       />
//     </box>
//   );
// }

function AudioSlider() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  const mic = Wp.get_default()?.audio.defaultMicrophone!;
  const show = Variable(false);

  return (
    <eventbox className="AudioSlider" onClick={() => show.set(!show.get())}>
      <box
        tooltipText={bind(speaker, "volume").as(
          (vol) => `${Math.floor(vol * 100)}%`
        )}
      >
        <icon icon={bind(mic, "volumeIcon")} />
        <icon icon={bind(speaker, "volumeIcon")} />
        <revealer
          reveal_child={show()}
          transition_type={Gtk.RevealerTransitionType.SLIDE_LEFT}
        >
          <box css="min-width: 120px">
            <slider
              hexpand
              onDragged={({ value }) => (speaker.volume = value)}
              value={bind(speaker, "volume")}
            />
          </box>
        </revealer>
      </box>
    </eventbox>
  );
}

function BatteryLevel() {
  const bat = Battery.get_default();

  return (
    <box className="Battery" visible={bind(bat, "isPresent")}>
      <icon icon={bind(bat, "batteryIconName")} />
      <label
        label={bind(bat, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
      />
    </box>
  );
}

function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="Workspaces">
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter(({ id }) => id > 0) // não pega special ws
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? "focused" : ""
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          ))
      )}
    </box>
  );
}

function FocusedClient() {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  return (
    <box className="Focused" visible={focused.as(Boolean)}>
      {focused.as(
        (client) =>
          client && (
            <label
              label={bind(client, "title").as((str) => str.substring(0, 80))}
            />
          )
      )}
    </box>
  );
}

function Time({ format = "%I:%M" }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!
  );

  const date = Variable<string>("").poll(
    86400000,
    () => GLib.DateTime.new_now_local().format("%d/%m%n%A")!
  );

  return (
    <button onClick={() => execAsync("gsimplecal")}>
      <label
        className="Time"
        onDestroy={() => {
          time.drop();
          // date.drop();
        }}
        label={time()}
        tooltip_text={date()}
      />
    </button>
  );
}

const divide = ([total, free]) => Math.floor((free / total) * 100);

function Memory() {
  let showMem = Variable<boolean>(true);

  function Mem() {
    const ram = Variable<string>("0").poll(2000, "free", (out): string => {
      return divide(
        out
          .split("\n")
          .find((line) => line.includes("Mem.:"))
          .split(/\s+/)
          .splice(1, 2)
      );
    });

    return (
      <box vertical valign={Gtk.Align.CENTER}>
        <label label="RAM" className="infoBox title" />
        <label
          label={bind(ram).as((men) => `${men}%`)}
          className="infoBox value"
        />
      </box>
    );
  }

  function Swap() {
    const swap = Variable<string>("0").poll(
      2000,
      "free",
      function (out): string {
        return divide(
          out
            .split("\n")
            .find((line) => line.includes("Swap:"))
            .split(/\s+/)
            .splice(1, 2)
        );
      }
    );

    return (
      <box vertical valign={Gtk.Align.CENTER}>
        <label label="SWAP" className="infoBox title" />
        <label
          label={bind(swap).as((men) => `${men}%`)}
          className="infoBox value"
        />
      </box>
    );
  }

  function ToggleMemory() {
    return (
      <stack
        transition-type="crossfade"
        visible-child-name={bind(showMem).as((show) => (show ? "mem" : "swap"))}
      >
        <box name="mem">{Mem()}</box>
        <box name="swap">{Swap()}</box>
      </stack>
    );
  }

  return (
    <eventbox onClick={() => showMem.set(!showMem.get())}>
      <ToggleMemory />
    </eventbox>
  );
}

function Process() {
  const cpu = Variable<string>("0").poll(2000, "top -b -n 1", (out) => {
    return divide([
      100,
      out
        .split("\n")
        .find((line) => line.includes("%CPU(s)"))
        ?.split(/\s+/)[1]
        .replace(",", "."),
    ]);
  });

  return (
    <box vertical valign={Gtk.Align.CENTER}>
      <label label="CPU" className="infoBox title" />
      <label
        label={bind(cpu).as((use) => `${use}%`)}
        className="infoBox value"
      />
    </box>
  );
}

function DiscUse() {
  let showDisc = Variable<boolean>(true);

  function Home() {
    const home = Variable<string>("0%").poll(2000, "df -h", (out): string => {
      return out
        .split("\n")
        .find((line) => line.includes("/home"))
        ?.split(/\s+/)[4];
    });

    return (
      <box vertical valign={Gtk.Align.CENTER}>
        <label label="HOME" className="infoBox title" />
        <label
          label={bind(home).as((use) => `${use}`)}
          className="infoBox value"
        />
      </box>
    );
  }

  function Root() {
    const root = Variable<string>("0").poll(2000, "df -h", (out): string => {
      return out
        .split("\n")
        .find((line) => line.includes("/dev/sda5"))
        ?.split(/\s+/)[4];
    });

    return (
      <box vertical valign={Gtk.Align.CENTER}>
        <label label="ROOT" className="infoBox title" />
        <label
          label={bind(root).as((use) => `${use}`)}
          className="infoBox value"
        />
      </box>
    );
  }

  function ToggleDisc() {
    return (
      <stack
        transition-type="crossfade"
        visible-child-name={bind(showDisc).as((show) =>
          show ? "home" : "root"
        )}
      >
        <box name="home">{Home()}</box>
        <box name="root">{Root()}</box>
      </stack>
    );
  }

  return (
    <eventbox onClick={() => showDisc.set(!showDisc.get())}>
      <ToggleDisc />
    </eventbox>
  );
}

function Updates() {
  const pacman = Variable<number>(0).poll(600000, [
    "bash",
    "-c",
    "checkupdates 2> /dev/null | wc -l",
  ]);
  const aur = Variable<number>(0).poll(600000, [
    "bash",
    "-c",
    "auracle outdated 2> /dev/null | wc -l",
  ]);

  return (
    <box valign={Gtk.Align.CENTER}>
      <label
        label={bind(pacman).as((ups) => `${ups} 󰏔`)}
        tooltipText={bind(aur).as((ups) => `AUR: ${ups}`)}
        css={`
          font-size: 0.8em;
        `}
      />
    </box>
  );
}

function BrightnessSlider() {
  const brightness = Brightness.get_default();
  const show = Variable(false);

  return (
    <eventbox
      className="BrightnessSlider"
      onClick={() => show.set(!show.get())}
    >
      <box>
        <icon icon={"display-brightness-symbolic"} />
        <revealer
          reveal_child={show()}
          transition_type={Gtk.RevealerTransitionType.SLIDE_LEFT}
        >
          <box css="min-width: 120px">
            <slider
              hexpand
              cursor="pointer"
              value={bind(brightness, "screen")}
              onDragged={({ value }) => (brightness.screen = value)}
            />
          </box>
        </revealer>
      </box>
    </eventbox>
  );
}

function Vpn() {
  const vpnActive = Variable("0").poll(2000, "vpn-state");

  function runVpn() {
    if (vpnActive.get() === "0") {
      execAsync("vpn-ciasc")
        .catch((e) =>
          console.log(e)
        );
    } else {
      execAsync(["bash", "-c", "sudo killall -SIGTERM pppd"])
        .catch((e) => console.log(e))
        .finally(() =>
          execAsync([
            "bash", "-c", "notify-send -t 5000 --urgency=normal -i 'network-vpn-symbolic' 'VPN CIASC Desativada'"
          ])
        );
    }
  }

  return (
    <box className="Vpn" tooltipText="Ativa VPN CIASC">
      <button
        onClick={() => runVpn()}
        className={bind(vpnActive).as((v) => v === "1" ? "vpn-on" : "")}
      >
        <label label="VPN" />
      </button>
    </box>
  );
}

function Dpms() {
  const show = Variable(true);

  function Idle() {
    execAsync("idle_inhibitor toggle").catch((er) => console.log(er));
    show.set(!show.get());
  }

  function On() {
    return (
      <box vertical valign={Gtk.Align.CENTER}>
        {/* <label label="DPMS" className="dpms title" /> */}
        <icon icon="button-on-symbolic" className="dpms icon" />
      </box>
    );
  }

  function Off() {
    return (
      <box vertical valign={Gtk.Align.CENTER}>
        {/* <label label="DPMS" className="dpms title" /> */}
        <icon icon="button-off-symbolic" className="dpms icon" />
      </box>
    );
  }

  function ToggleIdle() {
    return (
      <stack
        transition-type="crossfade"
        visible-child-name={bind(show).as((s) => (s ? "on" : "off"))}
      >
        <box name="on" tooltipText="Desativa Proteção de Tela">
          {On()}
        </box>
        <box name="off" tooltipText="Ativa Proteção de Tela">
          {Off()}
        </box>
      </stack>
    );
  }

  return (
    <eventbox onClick={Idle}>
      <ToggleIdle />
    </eventbox>
  );
}

export default function Bar(monitor: Gdk.Monitor) {
  const anchor =
    Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT;

  return (
    <window
      className="Bar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={anchor}
    >
      <centerbox>
        <box hexpand halign={Gtk.Align.START}>
          <SysTray />
          <FocusedClient />
        </box>
        <box>
          <Workspaces />
        </box>
        <box hexpand halign={Gtk.Align.END}>
          <Vpn />
          <Dpms />
          <Updates />
          <AudioSlider />
          <BrightnessSlider />
          <DiscUse />
          <Process />
          <Memory />
          <BatteryLevel />
          <Time />
        </box>
      </centerbox>
    </window>
  );
}

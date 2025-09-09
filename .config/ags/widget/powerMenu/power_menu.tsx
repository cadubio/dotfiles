import { Astal, Gtk, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Hyprland from "gi://AstalHyprland";
import { execAsync } from "ags/process";


export default function PowerMenu(gdkmonitor: Gdk.Monitor) {
const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
const { IGNORE } = Astal.Exclusivity;
const { EXCLUSIVE } = Astal.Keymode;
const { CENTER } = Gtk.Align;
const hypr = Hyprland.get_default();

function powerOff() {
      execAsync("systemctl poweroff");
    }

    function reboot() {
      execAsync("systemctl reboot");
    }

    function logOut() {
      execAsync("uwsm stop");
    }

    function esc() {
      execAsync("ags quit --instance System-Power-Menu");
    }
return (
<window
      visible
      exclusivity={IGNORE}
      keymode={EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      application={app}
    >
    <Gtk.EventControllerKey
        onKeyPressed={({}, keyval: number) => {
        if (keyval === Gdk.KEY_Escape) {
          execAsync("ags quit --instance System-Power-Menu")
      }
    }}
    />
      <box halign={CENTER} valign={CENTER} orientation={Gtk.Orientation.VERTICAL}>
        <box homogeneous>
          <button onClicked={powerOff}>
            <image iconName={"system-shutdown-symbolic"} />
          </button>

          <button onClicked={reboot}>
            <image iconName={"system-reboot-symbolic"} />
          </button>

          <button onClicked={logOut}>
            <image iconName={"system-log-out-symbolic"} />
          </button>

          <button onClicked={esc}>
            <image iconName={"window-close-symbolic"} />
          </button>
        </box>
        <box homogeneous>
          <label label="[ desligar ]" />
          <label label="[ reiniciar ]" />
          <label label="[ logout ]" />
          <label label="[ fechar ]" />
        </box>
      </box>
    </window>
)};
#!/usr/bin/gjs -m
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { execAsync } from "astal/process";

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
const { IGNORE } = Astal.Exclusivity;
const { EXCLUSIVE } = Astal.Keymode;
const { CENTER } = Gtk.Align;
const hypr = Hyprland.get_default();

App.start({
  instanceName: "powerMenuInst",
  gtkTheme: "adw-gtk3-dark",
  css: /* css */ `
        window {
            all: unset;
            background-color: alpha(black, 0.3);
        }

        window > box {
            margin: 10px;
            padding: 6px;
            box-shadow: 2px 3px 5px 0 alpha(black, 0.6);
            border-radius: 11px;
            border-color: alpha(white, 0.8);
            border-style: solid;
            border-width: 1px;
            background-color: #181818;
            color: white;
            min-width: 200px;
        }

        box > label {
            font-size: large;
            margin: 6px;
        }

        label.title {
            font-size: 1.4em;
        }

        .action {
            color: alpha(white, 0.8);
        }

        button {
            margin: 6px;
        }
    `,
  main: () => {
    function powerOff() {
      execAsync("systemctl poweroff");
    }

    function reboot() {
      execAsync("systemctl reboot");
    }

    function logOut() {
      hypr.message("dispatch exit");
    }

    function esc() {
      execAsync("ags quit --instance powerMenuInst");
    }

    function onKeyPress(_: Astal.Window, event: Gdk.Event) {
      if (event.get_keyval()[1] === Gdk.KEY_Escape) {
        esc();
      }
    }

    <window
      onKeyPressEvent={onKeyPress}
      exclusivity={IGNORE}
      keymode={EXCLUSIVE}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
    >
      <box halign={CENTER} valign={CENTER} vertical>
        <box homogeneous>
          <button onClicked={powerOff}>
            <icon icon={"system-shutdown-symbolic"} />
          </button>

          <button onClicked={reboot}>
            <icon icon={"system-reboot-symbolic"} />
          </button>

          <button onClicked={logOut}>
            <icon icon={"system-log-out-symbolic"} />
          </button>

          <button onClicked={esc}>
            <icon icon={"window-close-symbolic"} />
          </button>
        </box>
        <box homogeneous>
          <label label="[ desligar ]" />
          <label label="[ reiniciar ]" />
          <label label="[ logout ]" />
          <label label="[ fechar ]" />
        </box>
      </box>
    </window>;
  },
});

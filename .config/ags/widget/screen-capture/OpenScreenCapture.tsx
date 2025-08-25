import app from "ags/gtk4/app";
import { createBinding, For } from "ags";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";
import Hyprland from "gi://AstalHyprland";
import MyCheckButton from "./CheckButton";

export default function OpenScreenCapture() {
  const anchor =
    Astal.WindowAnchor.TOP |
    Astal.WindowAnchor.BOTTOM |
    Astal.WindowAnchor.LEFT |
    Astal.WindowAnchor.RIGHT;
  const { CENTER, END } = Gtk.Align;
  const hypr = Hyprland.get_default();
  const recAudio = <MyCheckButton />
  
   
  function hide() {
    app.quit();
  }

  function isActive(monitor: string, audio: boolean) {
    if (audio) {
      execAsync([
        "bash",
        "-c",
        "wf-recorder --audio --file=$HOME/gravacoes/captura-`date +%Y-%m-%d_%H-%M-%S`.mp4 --codec h264_vaapi -d /dev/dri/renderD128 --bframes 2 --output " +
          `${monitor}`,
      ])
        .then((out) => console.log(out))
        .catch((err) => console.log(err));
    } else {
      execAsync([
        "bash",
        "-c",
        "wf-recorder --file=$HOME/gravacoes/captura-`date +%Y-%m-%d_%H-%M-%S`.mp4 --codec h264_vaapi -d /dev/dri/renderD128 --bframes 2 --output " +
          `${monitor}`,
      ])
        .then((out) => console.log(out))
        .catch((err) => console.log(err));
    }
    app.toggle_window("openScreenCapture");
    app.toggle_window("closeScreenCapture");
  }

  const monitores = createBinding(hypr, "monitors");

  return (
    <window
      visible
      name="openScreenCapture"
      application={app}
      class="OpenScreenCapture"
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={anchor}
      keymode={Astal.Keymode.ON_DEMAND}
    >
    <Gtk.EventControllerKey
        onKeyPressed={({ }, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) {
            app.quit()
          }
        }}
      />
      <box halign={CENTER} valign={CENTER} orientation={Gtk.Orientation.VERTICAL}>
        <box halign={CENTER}>
          <label label="Selecione o monitor" />
        </box>
        <box halign={END}>
            <MyCheckButton />
        </box>
        <box>
        <For each={monitores}>
          {
            (monitor) => (
              <button onClicked={() => isActive(`${monitor.name}`, recAudio.get_property("active", Boolean))}>
                <label label={`${monitor.name}`} />
              </button>
            )
          }
        </For>
        </box>
      </box>
    </window>
  )
}

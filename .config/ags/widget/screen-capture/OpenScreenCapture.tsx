import { App } from "astal/gtk3";
import { bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import { execAsync } from "astal";
import Hyprland from "gi://AstalHyprland";
import MyCheckButton from "./CheckButton"

export default function OpenScreenCapture() {
  const anchor =
    Astal.WindowAnchor.TOP |
    Astal.WindowAnchor.BOTTOM |
    Astal.WindowAnchor.LEFT |
    Astal.WindowAnchor.RIGHT;
  const { CENTER, END } = Gtk.Align;
  const hypr = Hyprland.get_default();
  const recAudio = <MyCheckButton></MyCheckButton>
  
   
  function hide() {
    App.quit();
  }

  function onKeyPress(_: Astal.Window, event: Gdk.Event) {
    if (event.get_keyval()[1] === Gdk.KEY_Escape) {
      hide();
    }
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
    App.toggle_window("openScreenCapture");
    App.toggle_window("closeScreenCapture");
  }

  return (
    <window
      name="openScreenCapture"
      application={App}
      className="OpenScreenCapture"
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={anchor}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyReleaseEvent={onKeyPress}
    >
      <box halign={CENTER} valign={CENTER} vertical>
        <box halign={CENTER}>
          <label label="Selecione o monitor" />
        </box>
        <box halign={END}>
            {recAudio}
        </box>
        <box>
          {bind(hypr, "monitors").as((ms) =>
            ms.map((monitor) => (
              <button onClicked={() => isActive(`${monitor.name}`, recAudio.active)}>
                <label label={`${monitor.name}`} />
              </button>
            ))
          )}
        </box>
      </box>
    </window>
  );
}
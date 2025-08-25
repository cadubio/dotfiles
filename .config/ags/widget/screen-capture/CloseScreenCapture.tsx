import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";


export default function CloseScreenCapture() {
    const anchor =
      Astal.WindowAnchor.BOTTOM |
      Astal.WindowAnchor.LEFT;
    const { CENTER, END } = Gtk.Align;    
     
    function stopCapture() {
        execAsync(["bash", "-c", "pkill --signal=SIGINT wf-recorder && notify-send -t 4000 -i emblem-videos-symbolic 'Video gravado em /home/cadu/gravacoes'"]).catch((er) => console.log(er));

    }
  
    return (
      <window
        name="closeScreenCapture"
        application={app}
        class="CloseScreenCapture"
        visible={false}
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
        <box halign={CENTER} valign={CENTER} orientation={Gtk.Orientation.VERTICAL} class="close-capture">
        <button onClicked={stopCapture}>
          <image iconName={"media-playback-pause"} />
          </button>
        </box>
      </window>
    );
  }
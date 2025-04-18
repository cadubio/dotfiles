import { App, Widget } from "astal/gtk3";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import { execAsync } from "astal";


export default function CloseScreenCapture() {
    const anchor =
      Astal.WindowAnchor.BOTTOM |
      Astal.WindowAnchor.LEFT;
    const { CENTER, END } = Gtk.Align;    
     
    function hide() {
      App.quit();
    }
  
    function onKeyPress(_: Astal.Window, event: Gdk.Event) {
      if (event.get_keyval()[1] === Gdk.KEY_Escape) {
        hide();
      }
    }

    function stopCapture() {
        execAsync(["bash", "-c", "pkill --signal=SIGINT wf-recorder && notify-send -t 4000 -i emblem-videos-symbolic 'Video gravado em /home/cadu/gravacoes'"])

    }
  
    return (
      <window
        name="closeScreenCapture"
        application={App}
        className="CloseScreenCapture"
        visible={false}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={anchor}
        keymode={Astal.Keymode.ON_DEMAND}
        onKeyReleaseEvent={onKeyPress}
      >
        <box halign={CENTER} valign={CENTER} vertical className="close-capture">
        <button onClicked={stopCapture}>
          <icon icon="media-playback-pause" />
          </button>
        </box>
      </window>
    );
  }
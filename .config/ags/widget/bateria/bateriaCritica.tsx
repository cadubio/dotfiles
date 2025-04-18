import Battery from "gi://AstalBattery";
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind } from "astal";

export default function bateriaCritica() {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
  const { CENTER } = Gtk.Align;

  const batt = Battery.get_default();
  const carga = bind(batt, "percentage").get();
  const carregador = bind(batt, "charging").get();

  function hide() {
    // const win = App.get_active_window()
    console.log(carga);
    // App.get_window("batCritica")!.hide()
    App.quit();
  }

  function onKeyPress(_: Astal.Window, event: Gdk.Event) {
    if (event.get_keyval()[1] === Gdk.KEY_Escape) {
      hide();
    }
  }

  return (
    <window
      name="batCritica"
      onKeyPressEvent={onKeyPress}
      monitor={0}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      keymode={Astal.Keymode.EXCLUSIVE}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      className="BateriaCritica"
      setup={(self) => {
        const limite = 0.20;
        // Initial visibility check
        self.visible = carga >= limite && !carregador;

        // Add listeners for battery changes
        batt.connect("notify::percentage", () => {
          self.visible = self.visible = carga <= limite && !carregador;
        });

        batt.connect("notify::charging", () => {
          self.visible = self.visible = carga <= limite && !carregador;
        });
      }}
    >
      <box halign={CENTER} valign={CENTER} vertical>
        <box halign={CENTER}>
          <label label="ATENÇÃO !!!" className="atencao" />
        </box>
        <box halign={CENTER}>
          <label label={"Bateria em nível crítico"} />
        </box>
        <box halign={CENTER}>
          <icon icon={bind(batt, "iconName")} />
          <label label={bind(batt, "percentage").as((p) => p * 100 + " %")} />
        </box>
        <box halign={CENTER}>
          <label label={"Conecte o carregador"} className="perigo" />
        </box>
      </box>
    </window>
  );
}

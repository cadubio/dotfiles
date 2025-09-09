import Battery from "gi://AstalBattery";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { createBinding, createState } from "ags";
import app from "ags/gtk4/app";

export default function JanelaBatCritica(gdkmonitor: Gdk.Monitor) {
  
const batt = Battery.get_default();

  // Create a variable to track window visibility state
  const [shouldShow, setShouldShow] = createState(false);

    // Update the visibility logic whenever battery properties change
    const updateVisibility = () => {
      const batteryLow = batt.percentage <= 0.20;
      const isCharging = batt.charging;
      setShouldShow(batteryLow && !isCharging);
    };
    
    // Connect to battery property change signals
    batt.connect("notify::percentage", updateVisibility);
    batt.connect("notify::charging", updateVisibility);
    batt.connect("notify::state", updateVisibility);
    
    // Initial check
    updateVisibility();

function hide() {
  setShouldShow(false);
}

  return (
  <window
    visible={ shouldShow.as(v => v) }
    name="bateria-critica"
    exclusivity={Astal.Exclusivity.IGNORE}
    keymode={Astal.Keymode.EXCLUSIVE}
    gdkmonitor={gdkmonitor}
    
  >
  <Gtk.EventControllerKey
    onKeyPressed={({ widget }, keyval: number) => {
      if (keyval === Gdk.KEY_Escape) {
        widget.hide()
      }
    }}
  />
    <box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={60}
      css="padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;"
    >
      <label
        label="ATENÇÃO !!!"
        css="font-size: 24px; color: #e9e111;"
      />
      
      <box spacing={4}>
        <image
          css="font-size: 24px;"
          iconName={createBinding(batt, 'batteryIconName')}
          iconSize={Gtk.IconSize.LARGE}
        />
        <label
          label={createBinding(batt, 'percentage').as(p => `Bateria em nível crítico ${Math.round(p*100)}%`)}
          css="font-size: 24px; color: #e94f4f;"
        />
      </box>
      
      <label
        label="Conecte o carregador!"
        css="font-size: 24px; color: #e9e111;"
      />      
    </box>
  </window>
)};



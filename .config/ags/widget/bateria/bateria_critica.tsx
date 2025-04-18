import Battery from "gi://AstalBattery";
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind, Variable } from "astal";




export default function JanelaBatCritica() {
const batt = Battery.get_default();
const carga = bind(batt, "percentage");
const carregador = bind(batt, "charging");
const estado = bind(batt, "state");

  // Create a variable to track window visibility state
  const shouldShow = Variable(false);

    // Update the visibility logic whenever battery properties change
    const updateVisibility = () => {
      const batteryLow = batt.percentage <= 0.20;
      const isCharging = batt.charging;
      shouldShow.set(batteryLow && !isCharging);
    };
    
    // Connect to battery property change signals
    batt.connect("notify::percentage", updateVisibility);
    batt.connect("notify::charging", updateVisibility);
    batt.connect("notify::state", updateVisibility);
    
    // Initial check
    updateVisibility();

function hide() {
  shouldShow.set(false);
}

  return (
  <window
    name="bateria-critica"
    onKeyPressEvent={(_, event) => {
      if (event.get_keyval()[1] === Gdk.KEY_Escape) {
        hide();
      }
    }}
    keymode={Astal.Keymode.EXCLUSIVE}
    css="padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;"
    visible={ bind(shouldShow).as(v => v) }
  >
    <box
      vertical={true}
      spacing={60}
      css="padding: 20px; border: 3px solid #77a5bf; border-radius: 12px;"
    >
      <label
        label="ATENÇÃO !!!"
        css="font-size: 24px; color: #e9e111;"
      />
      
      <box spacing={4}>
        <icon
          css="font-size: 24px"
          icon={bind(batt, 'iconName')}
        />
        <label
          label={bind(batt, 'percentage').as(p => `Bateria em nível crítico ${Math.round(p*100)}%`)}
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



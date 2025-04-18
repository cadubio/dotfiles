#!/usr/bin/gjs -m
import Battery from "gi://AstalBattery";
import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind } from "astal";


const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;
const { IGNORE } = Astal.Exclusivity;
const { EXCLUSIVE } = Astal.Keymode;
const { CENTER } = Gtk.Align;

App.start({
    instanceName: "bateriaCritica",
    gtkTheme: "adw-gtk3-dark",
    css: /* css */ `
        window {
            all: unset;
            background-color: alpha(black, 0.3);
        }
        window > box {
            margin: 10px;
            padding: 30px;
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

        label.atencao {
            color: #F5F539;
        }
        label.perigo {
            color: #FF0000;
            font-weight: bold;
        }
    `,
    main: () => {
        const batt = Battery.get_default();
        const carga =  bind(batt, "percentage").get()
        const carregador = bind(batt, "charging").get()

        function hide() {
            // App.quit();
            App.get_active_window()?.hide()
            // App.get_window("batCritica")!.hide()
        }

        function onKeyPress(_: Astal.Window, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape) {
                hide();
            }
        }

        <window
            name="batCritica"
            onKeyPressEvent={onKeyPress}
            exclusivity={IGNORE}
            keymode={EXCLUSIVE}
            anchor={TOP | BOTTOM | LEFT | RIGHT}
            setup={(self) => {
                
                const limite = 0.05
                // Initial visibility check
                self.visible = (carga <= limite && !carregador);

                // Add listeners for battery changes
                batt.connect('notify::percentage', () => {
                    self.visible = (carga <= limite && !carregador);
                });

                batt.connect('notify::charging', () => {
                    self.visible = (carga <= limite && !carregador);
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
                    <label label={`${carga * 100}%`} />
                </box>
                <box halign={CENTER}>
                    <label label={"Conecte o carregador"} className="perigo" />
                </box>
            </box>
        </window>;
    }
});
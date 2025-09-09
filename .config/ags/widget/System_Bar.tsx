import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { Accessor, createBinding, createState, For } from "ags";
import AstalTray from "gi://AstalTray";
import Wp from "gi://AstalWp";
import Hyprland from "gi://AstalHyprland";
import Battery from "gi://AstalBattery";
import Brightness from "./Brigthness";

const hyprland = Hyprland.get_default();

function SysTray() {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
        btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }

  return (
    <box halign={Gtk.Align.START}>
      <For each={items}>
        {
            (item: AstalTray.TrayItem) => (
                <menubutton $={(self) => init(self, item)}>
                    <image gicon={createBinding(item, "gicon")} />
                </menubutton>
            )
        }
      </For>
    </box>
  );
}

function FocusedClient() {
  const focused = createBinding(hyprland, "focusedClient");

  return (
    <box visible={focused.as(Boolean)}>
      <label
        label={focused.as((str) => str?.title?.substring(0, 80) || "")}
      />
    </box>
  );
}

function logOut() {
execAsync("bash -c hsm save");
 hyprland.message("dispatch exit");
}

function Workspaces() {
  const wss = createBinding(hyprland, "workspaces")
  const wss_filtered = wss.as((v) => v.filter((id) => id.id > 0).sort((a, b) => a.id - b.id))

  return (
    <box>
     <For each={wss_filtered}>
       {(ws) => (
          <button
            class={createBinding(hyprland, "focusedWorkspace").as((fw) =>
              fw && ws.id === fw.id ? "focused" : ""
            )}
            label={ws.id.toString()}
            onClicked={() => ws.focus()}
          />
        )}
      </For>
    </box>
  );
}


//function Sair() {
//  return (
//    <box>
//   <menubutton>
//      <label label={"Sair"} />
//      <popover>
//          <button onClicked={logOut}>
//           <box orientation={Gtk.Orientation.HORIZONTAL} spacing={5}>
//              <image iconName={"view-refresh-symbolic"} /> 
//              <label label={"Trocar usuário"} />
//            </box>   
//          </button>
//      </popover>
//    </menubutton>
//    </box>
//  );
//}

function BrightnessSlider() {
  const brightness = Brightness.get_default();
  
  return (
         <menubutton>
        <image
          iconName={"display-brightness-symbolic"}
        />
        <popover>
          <box>
            <slider
              widthRequest={260}
              onChangeValue={({ value }) => brightness.screen = value}
              value={createBinding(brightness, "screen")}
            />
          </box>
        </popover>
      </menubutton>
  );
}

function AudioControl() {
  const { defaultSpeaker: speaker, defaultMicrophone: mic } = Wp.get_default();

  return (
    <box>
      <menubutton>
        <image
          iconName={createBinding(mic, "mute").as((muted) =>
            muted ? "microphone-disabled-symbolic" : "audio-input-microphone-symbolic"
          )}
        />
        <popover>
          <box>
            <slider
              widthRequest={260}
              onChangeValue={({ value }) => mic.set_volume(value)}
              value={createBinding(mic, "volume")}
            />
          </box>
        </popover>
      </menubutton>
      <menubutton>
        <image iconName={createBinding(speaker, "volumeIcon")} />
        <popover>
          <box>
            <slider
              widthRequest={260}
              onChangeValue={({ value }) => speaker.set_volume(value)}
              value={createBinding(speaker, "volume")}
            />
          </box>
        </popover>
      </menubutton>
    </box>
  )
}

const divide = ([total, free]) => Math.floor((free / total) * 100);

function Ram() {
   const ram = createPoll("", 2000, "free", (out: string) => 
      divide(out.split("\n").find((line) => line.includes("Mem.:")).split(/\s+/).splice(1, 2)).toString().concat("%")
    );
    
     return (
      <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
        <label label="RAM" class={"percents"} css={"color: rgba(94, 129, 172, 0.7);"} />
        <label label={ram} class={"percents"} />
      </box>
    );
  }

  function Swap() {
   const ram = createPoll("", 2000, "free", (out) => 
      divide(out.split("\n").find((line) => line.includes("Swap.:")).split(/\s+/).splice(1, 2)).toString().concat("%")
    );
    
     return (
      <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
        <label label="SWAP" class={"percents"} css={"color: rgba(94, 129, 172, 0.7);"} />
        <label label={ram} class={"percents"} />
      </box>
    );
  }


  // bind(showMem).as((show) => (show ? "mem" : "swap"))
  //const [visibleChild, setVer] = createState(true)
  //const visibleLabel = visibleChild.as((v) => (v ? "visivel" : "a_ver"));
  //const [visibleName, setVisibleName] = createState("visivel")
  function Memoria() {
    //const [ver, setVer] = createState(true)
    return (
        <Ram />

    );
  }

function DiscUse() {
//  let [showDisc, setShowDisc] = createState(true);

  const home = createPoll("0%", 2000, "df -h", (out) => {
      return out.split("\n").find((line) => line.includes("/home")).split(/\s+/)[4].toString();
  })
    return (
      <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
        <label label="HOME" class={"percents"} css={"color: rgba(94, 129, 172, 0.7);"} />
        <label label={home.as((v) => v)} class={"percents"} />
      </box>
    );
  }

function Process() {
  const cpu = createPoll("0%", 2000, "top -b -n 1", (out) => {
    return divide([
      100,
      out
        .split("\n")
        .find((line) => line.includes("%CPU(s)"))
        ?.split(/\s+/)[1]
        .replace(",", ".")
    ]).toString();
  });

  return (
    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
      <label label="CPU" class={"percents"} css={"color: rgba(94, 129, 172, 0.7);"} />
      <label
        label={cpu.as((use) => `${use}%`)}
        class={"percents"}
      />
    </box>
  );
}

function Updates() {
  const pacman = createPoll("0", 600000, [
    "bash",
    "-c",
    "checkupdates 2> /dev/null | wc -l",
  ]);
  const aur = createPoll("0", 600000, [
    "bash",
    "-c",
    "auracle outdated 2> /dev/null | wc -l",
  ]);

  return (
    <box>
      <label
        label={pacman.as((ups) => `${ups} 󰏔`)}
        tooltipText={aur.as((ups) => `AUR: ${ups}`)}
      />
    </box>
  );
}

function BatteryLevel() {
  const bat = Battery.get_default();
  
  return (
    <box class="Battery" visible={createBinding(bat, "isPresent")}>
      <image iconName={createBinding(bat, "batteryIconName")} />
      <label
        label={createBinding(bat, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
      />
    </box>
  );
}

function Dpms() {
  const [show, setShow] = createState(true);

  function Idle() {
    execAsync("idle_inhibitor toggle").catch((er) => console.log(er));
    setShow(!show.get());
  }

  function On() {
    return (        
      <image iconName={"video-display-symbolic"} />
    );
  }

  function Off() {
    return (        
      <image iconName={"x-office-presentation-symbolic"} />
    );
  }

  function ToggleIdle() {
    return (
      <box tooltipText={show.as((s) => (s ? "Desativa Proteção de Tela" : "Ativa Proteção de Tela"))}>
        <revealer revealChild={show}>
          <On />
        </revealer>
        <revealer revealChild={show.as(s => !s)}>
          <Off />
        </revealer>
      </box>
    );
  }

  return (
    <box>
    <button onClicked={Idle}>
      <ToggleIdle />
    </button>
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll("", 1000, "date +'%I:%M'")
  const hoje = createPoll("", 86400000, "date +'%d/%m%n%A'")
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        
        <box $type="start" name={"esquerda"} hexpand halign={Gtk.Align.START}>
          <SysTray />
          <FocusedClient />
        </box>
        
        <box $type="center" name={"centro"} hexpand halign={Gtk.Align.CENTER}>
          <Workspaces />
    
        </box>

        <box $type="end" name={"direita"} spacing={10}>
          <Dpms />
          <Updates />
          <Process />
          <DiscUse />
          <Memoria />
          <BrightnessSlider />
          <AudioControl />
          <BatteryLevel />
          <menubutton tooltipText={hoje}>
            <label label={time} />
            <popover>
              <Gtk.Calendar />
            </popover>
          </menubutton>
        </box>
      </centerbox>
    </window>
  )
}

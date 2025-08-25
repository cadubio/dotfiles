import { Gtk } from "ags/gtk4"

export default function MyCheckButton() {

    return <Gtk.ToggleButton
        label={"Gravar Audio"}
        active={false}
        onToggled={(self) => {
            console.log(self.active)
        }}
    />
}
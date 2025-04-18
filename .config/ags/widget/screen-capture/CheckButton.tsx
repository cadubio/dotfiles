import GObject from "gi://GObject"
import { Gtk, astalify, type ConstructProps } from "astal/gtk3"

// subclass, register, define constructor props
class CheckButton extends astalify(Gtk.ToggleButton) {
    static { GObject.registerClass(this) }

    constructor(props: ConstructProps<
        CheckButton,
        Gtk.CheckButton.ConstructorProps,
        { toggled: [] } // signals of Gtk.CheckButton have to be manually typed
    >) {
        super(props as any)
    }
}

export default function MyCheckButton() {
    function setup(button: CheckButton) {

    }

    return <CheckButton
        setup={setup}
        label={"Gravar Audio"}
        active={false}
        toggled={(self) => {
            console.log(self.active)
        }}
    />
}
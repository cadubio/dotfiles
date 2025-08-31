import app from "ags/gtk4/app"
import { Astal, Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd"
import Notification from "./Notification"
import { createBinding, For, createState, onCleanup } from "ags"

export default function NotificationPopups() {
  const monitors = createBinding(app, "monitors")

  const notifd = AstalNotifd.get_default()

  const [notifications, setNotifications] = createState(
    new Array<AstalNotifd.Notification>(),
  )

  // Map para armazenar os timeouts de cada notificação
  const notificationTimeouts = new Map<number, number>()

  // Função para remover notificação após timeout
  const removeNotificationAfterTimeout = (notificationId: number) => {
    const timeoutId = setTimeout(() => {
      setNotifications((ns) => ns.filter((n) => n.id !== notificationId))
      notificationTimeouts.delete(notificationId)
    }, 5000) // 5 segundos

    notificationTimeouts.set(notificationId, timeoutId)
  }

  // Função para cancelar timeout se notificação for removida manualmente
  const clearNotificationTimeout = (notificationId: number) => {
    const timeoutId = notificationTimeouts.get(notificationId)
    if (timeoutId) {
      clearTimeout(timeoutId)
      notificationTimeouts.delete(notificationId)
    }
  }

  const notifiedHandler = notifd.connect("notified", (_, id, replaced) => {
    const notification = notifd.get_notification(id)

    if (replaced && notifications.get().some((n) => n.id === id)) {
      // Se é uma notificação substituída, cancelar o timeout antigo
      clearNotificationTimeout(id)
      setNotifications((ns) => ns.map((n) => (n.id === id ? notification : n)))
      // Criar novo timeout para a notificação substituída
      removeNotificationAfterTimeout(id)
    } else {
      setNotifications((ns) => [notification, ...ns])
      // Iniciar timeout para nova notificação
      removeNotificationAfterTimeout(id)
    }
  })

  const resolvedHandler = notifd.connect("resolved", (_, id) => {
    // Limpar timeout ao resolver manualmente
    clearNotificationTimeout(id)
    setNotifications((ns) => ns.filter((n) => n.id !== id))
  })

  onCleanup(() => {
    // Limpar todos os timeouts ao fazer cleanup
    notificationTimeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    notificationTimeouts.clear()
    
    notifd.disconnect(notifiedHandler)
    notifd.disconnect(resolvedHandler)
  })

  return (
    <For each={monitors}>
      {(monitor) => (
        <window
          $={(self) => onCleanup(() => self.destroy())}
          class="NotificationPopups"
          gdkmonitor={monitor}
          visible={notifications((ns) => ns.length > 0)}
          anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        >
          <box orientation={Gtk.Orientation.VERTICAL}>
            <For each={notifications}>
              {(notification) => <Notification notification={notification} />}
            </For>
          </box>
        </window>
      )}
    </For>
  )
}
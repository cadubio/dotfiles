import { monitorFile } from "resource:///com/github/Aylur/ags/utils.js";
import { Abrir } from "./abrir_captura.js";
import { Fechar } from "./fechar_captura.js";

monitorFile("/home/cadu/.config/ags/css/screen_record.css", function () {
  App.resetCss();
  App.applyCss("/home/cadu/.config/ags/css/screen_record.css");
});

App.config({
    style: "/home/cadu/.config/ags/css/screen_record.css",
    windows: [Abrir(), Fechar()],
  });
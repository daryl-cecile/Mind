"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventController_1 = require("./libs/EventController");
EventController_1.EventController.trigger('startup-script-begin', []);
console.log('ready');
EventController_1.EventController.trigger('startup-script-end', []);
//# sourceMappingURL=startup.js.map
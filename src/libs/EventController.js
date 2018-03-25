"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventController;
(function (EventController) {
    const EventRegistry = {};
    const TriggeredEvents = [];
    class Event {
        constructor() {
            this.EventName = "";
            this.Properties = {
                SingleRun: false,
                Called: false
            };
        }
        trigger(params) {
            if ((this.Properties.SingleRun === true && this.Properties.Called === false) || (this.Properties.SingleRun === false)) {
                this.EventHandler.apply(this, params);
                this.Properties.Called = true;
                if (TriggeredEvents.indexOf(this.EventName) === -1)
                    TriggeredEvents.push(this.EventName);
            }
        }
    }
    EventController.trigger = (eventName, parameters) => {
        if (EventRegistry[eventName]) {
            EventRegistry[eventName].forEach((e) => {
                e.trigger(parameters);
            });
        }
    };
    EventController.on = (eventName, eventHandler, opt) => {
        let e = new Event();
        e.EventName = eventName;
        e.EventHandler = eventHandler;
        Object.keys(opt).forEach((optionName) => {
            e.Properties[optionName] = opt[optionName];
        });
        e.Properties.Called = false;
        if (!EventRegistry[eventName])
            EventRegistry[eventName] = [];
        EventRegistry[eventName].push(e);
        return e;
    };
    EventController.once = (eventName, eventHandler, opt) => {
        let eventListener = EventController.on(eventName, eventHandler, opt);
        if (TriggeredEvents.indexOf(eventName) > -1) {
            eventListener.trigger([]);
        }
        return eventListener;
    };
})(EventController = exports.EventController || (exports.EventController = {}));
document.addEventListener('DOMContentLoaded', (e) => EventController.trigger('document-ready', [e]));
//# sourceMappingURL=EventController.js.map
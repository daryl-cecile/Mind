
export namespace EventController{

    const EventRegistry:{
        [eventName:string]:Array<Event>
    } = {};

    const TriggeredEvents:Array<string> = [];

    export interface IEvent{
        EventName:string;
        EventHandler:()=>any;
        Properties:{
            SingleRun:boolean,
            Called:boolean
        }
    }

    class Event implements IEvent {

        public EventName:string = "";
        public EventHandler:()=>any;
        public Properties = {
            SingleRun:false,
            Called:false
        };

        public trigger(params:any[]){
            if ( (this.Properties.SingleRun === true && this.Properties.Called === false) || (this.Properties.SingleRun === false) ){
                this.EventHandler.apply(this,params);
                this.Properties.Called = true;

                if ( TriggeredEvents.indexOf(this.EventName) === -1 ) TriggeredEvents.push(this.EventName);
            }
        }

    }

    export const trigger = (eventName:string,parameters:any[]) => {
        if ( EventRegistry[eventName] ){
            EventRegistry[eventName].forEach((e)=>{
                e.trigger(parameters);
            });
        }
    };

    export const on = (eventName:string,eventHandler:()=>any,opt?):Event=>{

        let e = new Event();
        e.EventName = eventName;
        e.EventHandler = eventHandler;

        Object.keys(opt).forEach((optionName:string)=>{
            e.Properties[optionName] = opt[optionName];
        });

        e.Properties.Called = false;

        if ( !EventRegistry[eventName] ) EventRegistry[eventName] = [];
        EventRegistry[eventName].push(e);

        return e;

    };

    export const once = (eventName:string,eventHandler:()=>any,opt?):Event=>{
        let eventListener = on(eventName,eventHandler,opt);

        if ( TriggeredEvents.indexOf( eventName ) > -1 ){
            eventListener.trigger([]);
        }

        return eventListener;
    };

}

document.addEventListener('DOMContentLoaded',(e)=>EventController.trigger('document-ready',[e]));
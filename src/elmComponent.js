sap.ui.define(['sap/ui/core/Control'], function(Control) {
    return Control.extend("custom.component.Elm", {
        metadata: {
            properties: {
                app: {
                    type: "object"
                },
                eventPort: {
                    type: "string",
                    defaultValue: "outbound"
                },
                actionPort: {
                    type: "string",
                    defaultValue: "inbound"
                }
            },
            aggregations: {},
            events: {
                elmEvent: {}
            }
        },

        _actionQueue: [],
        _appInstance: null,

        renderer: function(oRm, oControl) {
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.write("></div>");
        },

        onAfterRendering: function(arguments) {
            var that = this;
            var div = this.getDomRef();

            this._appInstance = this.getProperty("app").embed(div);
            var eventPort = this.getProperty("eventPort");

            var port = this._appInstance.ports[eventPort];
            if (port) {
                port.subscribe(function(oEvent) { that._handleElmEvent(oEvent); });
            } else {
                console.error("Elm port " + eventPort + " not found");
            }

            this._processActionQueue();

            if (sap.ui.core.Control.prototype.onAfterRendering) {
                sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
            }
        },

        attachElmEvent: function(handler) {
            this.attachEvent("elmEvent", handler);
        },

        dispatch: function(action) {
            this._actionQueue.push(action);
            this._processActionQueue();
        },

        _handleElmEvent: function(oEvent) {
            this.fireEvent("elmEvent", oEvent);
        },

        _processActionQueue: function() {
            if (this._appInstance) {
                var component = this;
                var app = this._appInstance;
                this._actionQueue.forEach(function(action) {
                    app.ports[component.getProperty("actionPort")].send(action);
                });
                this._actionQueue = [];
            }
        }
    });
});

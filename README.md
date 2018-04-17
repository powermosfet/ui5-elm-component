# (Open)UI5 Elm component

Run an elm app in UI5, wrapped in a component

The Elm app needs two ports to communicate with the UI5 component: one for events going out, and one for actions coming in. 

The UI5 component needs to know their name, and this is configurable through the properties `eventPort` and `actionPort`. The default values for these properties are `outbound` and `inbound`, respectively.  

Usage example: 

```javascript
var elmApp = new custom.component.Elm({ app: Elm.ElmCounter });

elmApp.attachElmEvent(function(oEvent) {
    var params = oEvent.getParameters();

    switch(params.type) {
      case "newCounterValue":
        console.log("New counter value: " + params.counterValue);
        break;
    }
});

elmApp.dispatch({
    type: "increaseCount"
});

elmApp.dispatch({
    type: "increaseCount"
});
```

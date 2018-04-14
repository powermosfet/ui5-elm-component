# ui5-elm-component
Run an elm app in UI5 as a component

Usage example:

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

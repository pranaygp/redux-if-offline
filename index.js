// require('offline-js')
const OfflineMiddleware = store => {
  if(navigator.onLine){
    store.dispatch({
      type: "@@redux-if-offline/INIT/CONNECTED"
    })
  } else {
    store.dispatch({
      type: "@@redux-if-offline/INIT/DISCONNECTED"
    })
  }

  if(window.onoffline && window.ononline) {
    window.onoffline = e => {
      store.dispatch({
        type: "@@redux-if-offline/DISCONNECTED"
      })
    }

    window.ononline = e => {
      store.dispatch({
        type: "@@redux-if-offline/CONNECTED"
      })
    }
  } else {
    // window.Offline.on('down', e => console.log("offline", e))
    // window.Offline.on('up', console.log)
  }
  return next => action => next(action)
}

const OfflineReducer = (state = {offline: undefined}, action) => {
    switch (action.type){
      case "@@redux-if-offline/INIT/CONNECTED":
      case "@@redux-if-offline/CONNECTED":
        return { offline: false }
      case "@@redux-if-offline/INIT/DISCONNECTED":
      case "@@redux-if-offline/DISCONNECTED":
        return { offline: true }
      default: 
        return state
    }
  }

module.exports = {
  OfflineMiddleware,
  OfflineReducer
}
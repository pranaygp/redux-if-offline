// require('offline-js')
const OfflineMiddleware = store => {
  if(navigator.onLine){
    store.dispatch({
      type: "@@redux-offline/INIT/CONNECTED"
    })
  } else {
    store.dispatch({
      type: "@@redux-offline/INIT/DISCONNECTED"
    })
  }

  if(window.onoffline && window.ononline) {
    window.onoffline = e => {
      store.dispatch({
        type: "@@redux-offline/DISCONNECTED"
      })
    }

    window.ononline = e => {
      store.dispatch({
        type: "@@redux-offline/CONNECTED"
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
      case "@@redux-offline/INIT/CONNECTED":
      case "@@redux-offline/CONNECTED":
        return { offline: false }
      case "@@redux-offline/INIT/DISCONNECTED":
      case "@@redux-offline/DISCONNECTED":
        return { offline: true }
      default: 
        return state
    }
  }

module.exports = {
  OfflineMiddleware,
  OfflineReducer
}
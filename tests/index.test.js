const { createStore, applyMiddleware, combineReducers } = require('redux')
const { OfflineMiddleware, OfflineReducer } = require('../')

const store = createStore(
  combineReducers({
    navigatorStatus: OfflineReducer
  }),
  applyMiddleware( OfflineMiddleware )
)

describe("store", () => {
  // it("has default state", () => expect(store.getState().offline).toBeFalsy())

  if(navigator.onLine == false || navigator.offLine) {
    it("has to have the right offline/online value when offline", () => {
      // window.ononline()
      expect(store.getState().navigatorStatus.offline).toBeTruthy()
    })
  } else if(navigator.offLine == false || navigator.onLine) {
    it("has to have the right offline/online value when online", () => {
      // window.onoffline()
      expect(store.getState().navigatorStatus.offline).toBeFalsy()
    })
  }

})

console.log(store.getState().navigatorStatus)
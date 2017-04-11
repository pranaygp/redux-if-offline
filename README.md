# redux-if-offline

A super simple redux package (providing middleware and a reducer) to keep track of navigator online-offline status.

## How do I get this?

Easy:

``` bash
yarn add redux-if-offline

# if you don't have yarn
npm install redux-if-offline
```

## Cool how do I use it

When you set up your redux store, make sure you add our middleware (and reducer) to it

``` javascript
const { createStore, applyMiddleware, combineReducers } = require('redux')
const { OfflineMiddleware, OfflineReducer } = require('redux-if-offline')

const store = createStore(
  combineReducers({
    ...reducers,                  // Your reducers
    reduxOffline: OfflineReducer  // Optional
  }),
  applyMiddleware( OfflineMiddleware )
)
```

## Alright, I set it up. What does it do

`OfflineMiddleware` is pretty straightforward

As soon as your redux store is setup, it'll dispatch an event with one of these types:

**@@redux-if-offline/INIT/CONNECTED** OR **@@redux-if-offline/INIT/DISCONNECTED**

While a user is using your app, if their internet connection ever disconnects, an action with one of these types is dispatched:

**@@redux-if-offline/CONNECTED** OR **@@redux-if-offline/DISCONNECTED**

You can have your own reducers catch these actions and update your state :)

However, to make it easier, you can use the `OfflineReducer`. It automatically matches on these types and sets a single boolean `offline` to be `true` or `false`:

In the exampe code above

> `reduxOffline: OfflineReducer`

will automatically set `reduxOffline.offline` to be `true` or `false` accordingly

### Example of using the reducer

``` javascript
...

store.subscribe( () => {
  if(store.reduxOffline.offline)
    console.log("I'm Offline")
  else
    console.log("I'm Online!")
})

```

With React

```javascript
import React from 'react'
import { connect } from 'react-redux'

class OfflineIndicator extends React.Component {
  render(){
    return (this.props.state.reduxOffline.offline ? <div>You are currently offline. All messages sent will be cached and sent when you reconnect.</div> : null)
  }
}

export default connect()(OfflineIndicator)
```

## Why this package?

Well, checking if a browser is offline/online is rather simple (except for the cross-browser issues) and is non-business logic related code. As someone who strongly believes in the path of using the redux pattern in apps to only write business-logic code, and abstract everyting else away to middleware (for side-effects and such), this package is pretty important.

Moreover, the examples here don't do justice to the potential on top of a library this simple. There are a lot of things that can be done by checking the the browser is currently online/offline (indicators, caching API calls, alternative UI elements, etc.)
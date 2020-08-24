import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import items from '../reducers/items'

const reducerInitialState = { 
  items: [
    {
      uuid: '1234',
      complete: false,
      completionTime: 0,
      text: "test 1",
      subtopics: [
        {
          parentUuid: '1234',
          uuid: 'ABCD',
          complete: false,
          completionTime: 0,
          text: "sub-test 1",
        },
        {
          parentUuid: '1234',
          uuid: 'EFGH',
          complete: false,
          completionTime: 0,
          text: "sub-test 2",
        }
      ],
    },
    {
      uuid: '5678',
      complete: false,
      completionTime: 0,
      text: "test 2",
      subtopics: [],
    }
  ]
}

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(combineReducers({ items }), reducerInitialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}



// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
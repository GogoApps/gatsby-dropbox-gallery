import { useCallback, useState } from "react"
import { mocks } from "../mocks"
import { Nullable } from "../types"

type NewStateValue<S> = S | (() => S)

// NOTE: Proof-of-concept for custom hook wrapper on `useState` or `useReducer` that can use
// mocks if proper env variable (GATSBY_USE_MOCK) is set.
// It works but I'm not sure if this wouldn't make our code obscure... Anyway, this is just an
// idea of how we can go with common mocks in our app.
// For such huge project as ours and that count of external data sources it's could be much
// helpful to have possibility of just prepare mocks and be unblocked with working on the UI,
// without thinking of actual data sources at the very moment.
//
// Such generic hook will force us to always write mocks for data we're going to use on our
// pages. By data I mean data in UI-wise shape, not the one in which they come in from GraphQL.
//
// I'm not that fluent in writing more complex generics so probably it can be provided in much nicer
// shape...
export const createUsePageState = <M = typeof mocks>(mockedData: M) => <P extends keyof M>(
  page: P,
  defaultValue: NewStateValue<typeof mockedData[P]>,
): [typeof mockedData[P], (newState: typeof mockedData[P]) => void] => {
  // NOTE: could be useReducer as well.
  // TODO: this makes it a local state in a place where hook is called. It should be an actual
  //  setter passed as a param or as another composition
  const [state, setState] = useState<typeof mockedData[P]>(defaultValue)
  const decoratedSetState = useCallback(
    (newStateValue: NewStateValue<typeof mockedData[P]>) => {
      process.env.GATSBY_USE_MOCKS === "true" && mockedData[page]
        ? setState(mockedData[page])
        : setState(newStateValue)
    },
    [],
  )

  return [state, decoratedSetState]
}

export const usePageState = createUsePageState(mocks)

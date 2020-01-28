import React, { FunctionComponent, useEffect } from "react"
import { PhotoProvider } from "./Photos/photo-provider"

export const RootElementWrapper: FunctionComponent = ({ children }) => {
  useEffect(
    () => {
      console.log('RootElementWrapper mounted')

      return () => console.log('RootElementWrapper unmounted')
    },
    [],
  )

  return <PhotoProvider>{children}</PhotoProvider>
}

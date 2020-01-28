import React, { FunctionComponent } from "react"
import { PhotoContext } from "./photo-context"
import { Photo } from "./types"
import { usePageState } from "../../hooks/use-page-state"

export const PhotoProvider: FunctionComponent = ({ children }) => {
  const [photos, setPhotos] = usePageState<"photos">("photos", [])

  const value: PhotoContext = {
    photos,
    setPhotos,
  }

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  )
}

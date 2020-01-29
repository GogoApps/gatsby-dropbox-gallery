import React, { FunctionComponent, useCallback, useState } from "react"
import { PhotoContext } from "./photo-context"
import { Photo } from "../../features/photos/types"
import { usePageState } from "../../hooks/use-page-state"
import { Nullable } from "../../types"
import { mocks } from "../../mocks"

export const PhotoProvider: FunctionComponent = ({ children }) => {
  const [photos, setPhotos] = usePageState<"photos">("photos", [])
  // NOTE: 2nd approach to the state, with no auto-mocking
  const [selectedPhoto, selectedPhotoSetter] = useState<Nullable<Photo>>(null)
  const setSelectedPhoto = useCallback(
    (photo: Nullable<Photo>) => {
      if (process.env.GATSBY_USE_MOCKS === "true") {
        selectedPhotoSetter(mocks.photo)
      } else {
        selectedPhotoSetter(photo)
      }
    },
    [],
  )

  const value: PhotoContext = {
    photos,
    selectedPhoto,
    setPhotos,
    setSelectedPhoto,
  }

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  )
}

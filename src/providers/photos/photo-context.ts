import React from "react"
import { Photo, PhotoThumbnail } from "../../features/photos/types"
import { Nullable } from "../../types"

export interface PhotoContext {
  photos: PhotoThumbnail[]
  selectedPhoto: Nullable<Photo>
  setPhotos: (photos: PhotoThumbnail[]) => void
  setSelectedPhoto: (photo: Photo) => void
}

export const photoContextDefaultValue: PhotoContext = {
  photos: [],
  selectedPhoto: null,
  setPhotos: () => {},
  setSelectedPhoto: () => {},
}

export const PhotoContext = React.createContext<PhotoContext>(photoContextDefaultValue)

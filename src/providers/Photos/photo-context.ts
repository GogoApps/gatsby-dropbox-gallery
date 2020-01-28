import React from "react"
import { Photo } from "./types"

export interface PhotoContext {
  photos: Photo[]
  setPhotos: (photos: Photo[]) => void
}

export const photoContextDefaultValue: PhotoContext = {
  photos: [],
  setPhotos: () => {},
}

export const PhotoContext = React.createContext<PhotoContext>(photoContextDefaultValue)

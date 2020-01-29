import { useContext, useEffect } from "react"
import { PhotoQuery } from "../../../../graphql/types"
import { PhotoContext } from "../../../providers/photos/photo-context"
import { mapSourcePhotoToView } from "../mappers"

export const useSelectedPhotoData = (data: PhotoQuery) => {
  const { setSelectedPhoto } = useContext(PhotoContext)

  useEffect(
    () => {
      const selectedPhoto = mapSourcePhotoToView(data)

      if (selectedPhoto) {
        setSelectedPhoto(selectedPhoto)
      }
    },
    [],
  )
}

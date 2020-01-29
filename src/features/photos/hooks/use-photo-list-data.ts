import { useContext, useEffect } from "react"
import { PhotosPageQuery } from "../../../../graphql/types"
import { PhotoContext } from "../../../providers/photos/photo-context"
import { mapSourcePhotosToView } from "../mappers"

// TODO: work on making it common and generic
// NOTE: but probably it would be overkill as for various pages various things could be
// happening so forcing the common, generic mechanism could lead to serious maintenance problems
// in the future
export const usePhotoListData = (data: PhotosPageQuery) => {
  const { setPhotos } = useContext(PhotoContext)

  useEffect(
    () => {
      setPhotos(mapSourcePhotosToView(data))
    },
    [data],
  )
}

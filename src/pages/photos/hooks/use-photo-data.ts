import { useContext, useEffect } from "react"
import { PhotosPageQuery } from "../../../../graphql/types"
import { PhotoContext } from "../../../providers/Photos/photo-context"
import { mapFromDropboxToView } from "../mappers/dropbox-data-mapper"

// TODO: work on making it common and generic
// NOTE: but probably it would be overkill as for various pages various things could be
// happening so forcing the common, generic mechanism could lead to serious maintenance problems
// in the future
export const usePhotoData = (data: PhotosPageQuery) => {
  const { setPhotos } = useContext(PhotoContext)

  useEffect(
    () => {
      setPhotos(mapFromDropboxToView(data))
    },
    [data],
  )
}

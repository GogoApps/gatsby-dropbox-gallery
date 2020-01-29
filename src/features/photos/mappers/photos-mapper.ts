import { FluidObject } from "gatsby-image"
import { PhotosPageQuery } from "../../../../graphql/types"
import { PhotoThumbnail } from "../types"

export const mapSourcePhotosToView = (sourcePhotos?: PhotosPageQuery): PhotoThumbnail[] => {
  if (!sourcePhotos) {
    return []
  }

  return sourcePhotos.allDropboxNode.edges.reduce<PhotoThumbnail[]>(
    (mappedPhotos, { node }) => {
      if (!node.localFile?.sharp?.thumbnail) {
        return mappedPhotos
      }

      const thumbnail = Object.entries(node.localFile.sharp.thumbnail).reduce<FluidObject>(
        (mappedPhoto, [ key, value ]) => {
          if (value === undefined) {
            return mappedPhoto
          }

          return {
            ...mappedPhoto,
            [key]: value,
          }
        },
        {
          aspectRatio: 0,
          src: "",
          srcSet: "",
          sizes: "",
        },
      )

      mappedPhotos.push({
        id: node.id,
        name: node.name || "",
        thumbnail,
      })

      return mappedPhotos
    },
    [],
  )
}

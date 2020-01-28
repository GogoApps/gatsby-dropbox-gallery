import { FluidObject } from "gatsby-image"
import { PhotosPageQuery } from "../../../../graphql/types"
import { Photo } from "../../../providers/Photos/types"

export const mapFromDropboxToView = (dropboxData?: PhotosPageQuery): Photo[] => {
  if (!dropboxData) {
    return []
  }

  return dropboxData.allDropboxNode.edges.reduce<Photo[]>(
    (mappedPhotos, { node }) => {
      if (!node.localFile?.sharp?.photo) {
        return mappedPhotos
      }

      const photo = Object.entries(node.localFile.sharp.photo).reduce<FluidObject>(
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
        photo,
      })

      return mappedPhotos
    },
    [],
  )
}

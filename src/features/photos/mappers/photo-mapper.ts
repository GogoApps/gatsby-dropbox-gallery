import { PhotoQuery } from "../../../../graphql/types"
import { Photo } from "../types"
import { Nullable } from "../../../types"

export const mapSourcePhotoToView = (sourcePhoto?: PhotoQuery): Nullable<Photo> => {
  if (!sourcePhoto || !sourcePhoto.dropboxNode || !sourcePhoto.dropboxNode.localFile?.sharp?.photo) {
    return null
  }

  return {
    id: sourcePhoto.dropboxNode.id,
    name: sourcePhoto.dropboxNode.name || "",
    photo: {
      aspectRatio: 0,
      src: "",
      srcSet: "",
      sizes: "",
      ...sourcePhoto.dropboxNode.localFile.sharp.photo,
    }
  }
}

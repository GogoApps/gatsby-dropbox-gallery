import React, { FunctionComponent, useContext, useEffect } from "react"
import { graphql } from "gatsby"
import { PhotoQuery } from "../../graphql/types"
import { Photo } from "../features/photos/components/photo"
import { mapSourcePhotoToView } from "../features/photos/mappers/photo-mapper"
import { PhotoContext } from "../providers/photos/photo-context"
import { useSelectedPhotoData } from "../features/photos/hooks/use-selected-photo-data"

export interface PhotoTemplateProps {
  data: PhotoQuery
}

// NOTE: This would probably use components and queries/fragments strictly from Photos domain.
export const PhotoTemplate: FunctionComponent<PhotoTemplateProps> = ({ data }) => {
  useSelectedPhotoData(data)

  return (
    <Photo />
  )
}

// TODO: Use fragments here as well.
export const query = graphql`
  query Photo ($id: String!) {
    dropboxNode(id: { eq: $id }) {
      ...PhotoDetails
    }
  }
`

export default PhotoTemplate

import React, { FunctionComponent, useContext } from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { PhotoContext } from "../../../../providers/photos/photo-context"
import { BasePaths } from "../../../../basePaths"
import { PhotoListItem } from "./photo-list-item"

export const PhotoList: FunctionComponent = () => {
  const { photos } = useContext(PhotoContext)

  return (
    <div>
      <h2>Garb Products list</h2>
      {photos.map(({ id, name, thumbnail }, index: number) => (
        <PhotoListItem key={`${id}`} name={name} photo={thumbnail} />
      ))}
    </div>
  )
}

export const query = graphql`
  fragment PhotoList on DropboxNodeConnection {
    edges {
      node {
        ...PhotoThumbnail
      }
    }
  }
`

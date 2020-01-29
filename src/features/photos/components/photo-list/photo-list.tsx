import React, { FunctionComponent, useContext } from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { PhotoContext } from "../../../../providers/photos/photo-context"
import { BasePaths } from "../../../../basePaths"

export const PhotoList: FunctionComponent = () => {
  const { photos } = useContext(PhotoContext)

  return (
    <div>
      <h2>Garb Products list</h2>
      {photos.map(({ id, name, thumbnail }, index: number) => (
        <div key={`${id}`}>
          <Link to={`${BasePaths.Photos}${name}`}>
            <Image alt="" fluid={thumbnail} style={{ height: "100px", width: "100px" }}/>
            {name}
          </Link>
        </div>
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

import React, { FunctionComponent } from "react"
import { graphql, Link } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import { BasePaths } from "../../../../basePaths"

export interface PhotoListItemProps {
  name: string
  photo: FluidObject
}

export const PhotoListItem: FunctionComponent<PhotoListItemProps> = ({
  name,
  photo,
}) => (
  <div>
    <Link to={`${BasePaths.Photos}${name}`}>
      <Image alt="" fluid={photo} style={{ height: "100px", width: "100px" }} />
      {name}
    </Link>
  </div>
)

export const query = graphql`
  fragment PhotoThumbnail on DropboxNode {
    id
    name
    localFile {
      sharp: childImageSharp {
        photo: fixed(height: 100, width: 100) {
          srcSet
          src
        }
      }
    }
  }
`

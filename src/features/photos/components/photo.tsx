import React, { FunctionComponent, useContext } from "react"
import Image, { FluidObject } from "gatsby-image"
import { graphql } from "gatsby"
import { PhotoContext } from "../../../providers/photos/photo-context"

export const Photo: FunctionComponent = () => {
  const { selectedPhoto } = useContext(PhotoContext)

  if (!selectedPhoto) {
    return null;
  }

  const { name, photo } = selectedPhoto

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <h1
        style={{
          textShadow: "0 0 5px rgba(255, 255, 255, .4)",
          position: "absolute",
          right: "20px",
          top: "20px",
          zIndex: 2,
        }}
      >
        {name}
      </h1>
      <Image
        alt=""
        fluid={photo}
        style={{
          height: "100vh",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100vw",
          zIndex: "1",
        }}
      />
    </div>
  )
}

export const query = graphql`
  fragment PhotoDetails on DropboxNode {
    id
    name
    localFile {
      sharp: childImageSharp {
        photo: fluid(quality: 50) {
          srcSet
        }
      }
    }
  }
`

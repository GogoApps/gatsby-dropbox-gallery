import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { PhotoDetailsQuery } from "../../graphql/types"

export interface PhotoTemplateProps {
  data?: PhotoDetailsQuery
  name: string;
}

// TODO: I'm thinking about moviing this under the specific `page` as this would be the part of
// specific domain and wouldn't make sense outside of it... And it's always nice to have some
// "bounded contexts" clearly mapped to the file system :)
// Also this would probably use components and queries/fragments strictly from Photos domain.
export const PhotoTemplate: FunctionComponent<PhotoTemplateProps> = ({ data, name }) => {
  console.log(data)

  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

// TODO: Use fragments here as well.
export const query = graphql`
  query PhotoDetails ($id: String!) {
    dropboxNode(id: { eq: $id }) {
      id,
      name,
    }
  }
`

export default PhotoTemplate

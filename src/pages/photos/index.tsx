import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { PhotosPageQuery } from "../../../graphql/types"
import { usePhotoData } from "./hooks/use-photo-data"
import { Photos } from "./components/photos"

export interface ProductsPageProps {
  data: PhotosPageQuery
}

export const ProductsPage: FunctionComponent<ProductsPageProps> = ({ data }) => {
  usePhotoData(data)

  return <Photos />
}

export const query = graphql`
  query PhotosPage {
    allDropboxNode {
      ...PhotoList
    }
  }
`

export default ProductsPage

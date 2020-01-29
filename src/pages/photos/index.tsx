import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { PhotosPageQuery } from "../../../graphql/types"
import { usePhotoListData } from "../../features/photos/hooks/use-photo-list-data"
import { Photos } from "../../features/photos/components/photos"

export interface ProductsPageProps {
  data: PhotosPageQuery
}

export const ProductsPage: FunctionComponent<ProductsPageProps> = ({ data }) => {
  usePhotoListData(data)

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

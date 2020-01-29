import { PhotoThumbnail } from "../features/photos/types"
import { FluidObject } from "gatsby-image"

export const photosMock: PhotoThumbnail[] = [
  {
    id: "1",
    name: "name 1",
    thumbnail: {
      aspectRatio: 1,
      src: "src",
      srcSet: "srcSet",
      sizes: "1x1",
    },
  },
  {
    id: "2",
    name: "name 2",
    thumbnail: {
      aspectRatio: 1,
      src: "src",
      srcSet: "srcSet",
      sizes: "1x1",
    },
  },
]

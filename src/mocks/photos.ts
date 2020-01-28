import { Photo } from "../providers/Photos/types"
import { FluidObject } from "gatsby-image"

export const photosMock: Photo[] = [
  {
    id: "1",
    name: "name 1",
    photo: {
      aspectRatio: 1,
      src: "src",
      srcSet: "srcSet",
      sizes: "1x1",
    },
  },
  {
    id: "2",
    name: "name 2",
    photo: {
      aspectRatio: 1,
      src: "src",
      srcSet: "srcSet",
      sizes: "1x1",
    },
  },
]

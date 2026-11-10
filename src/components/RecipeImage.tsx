import { useState, type ImgHTMLAttributes } from 'react'
import fallbackImage from '../assets/recipe-placeholder.svg'

interface RecipeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
}

export function RecipeImage({ src, onError, ...props }: RecipeImageProps) {
  const [imageSource, setImageSource] = useState(src)

  return (
    <img
      {...props}
      onError={(event) => {
        onError?.(event)
        setImageSource(fallbackImage)
      }}
      src={imageSource}
    />
  )
}

import { useState, type ImgHTMLAttributes } from 'react'
import fallbackImage from '../assets/recipe-placeholder.svg'

interface RecipeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
}

export function RecipeImage({ src, onError, ...props }: RecipeImageProps) {
  const [imageState, setImageState] = useState({ source: src, currentSource: src })

  if (imageState.source !== src) {
    setImageState({ source: src, currentSource: src })
  }

  return (
    <img
      {...props}
      onError={(event) => {
        onError?.(event)
        setImageState({ source: src, currentSource: fallbackImage })
      }}
      src={imageState.currentSource}
    />
  )
}

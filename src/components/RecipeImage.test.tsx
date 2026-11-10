import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RecipeImage } from './RecipeImage'

describe('RecipeImage', () => {
  it('shows the new recipe image when its source changes', () => {
    const { rerender } = render(<RecipeImage alt="First dish" src="/first.jpg" />)

    rerender(<RecipeImage alt="Second dish" src="/second.jpg" />)

    expect(screen.getByAltText('Second dish').getAttribute('src')).toBe('/second.jpg')
  })

  it('uses the local placeholder when the image cannot load', () => {
    render(<RecipeImage alt="Dish" src="/missing.jpg" />)
    fireEvent.error(screen.getByAltText('Dish'))

    expect(screen.getByAltText('Dish').getAttribute('src')).toContain('data:image/svg+xml')
  })
})

import { describe, expect, it } from 'vitest'
import { recipes } from './recipes'

describe('recipe collection', () => {
  it('includes at least 20 bilingual recipes with unique IDs', () => {
    expect(recipes.length).toBeGreaterThanOrEqual(20)
    expect(new Set(recipes.map((recipe) => recipe.id)).size).toBe(recipes.length)
    expect(recipes.every((recipe) => recipe.name.vi && recipe.name.en)).toBe(true)
  })
})

import recipeData from './recipes.json'

export type Language = 'vi' | 'en'
export type Category = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'vegetarian'
export type LocalizedText = Record<Language, string>
export type LocalizedList = Record<Language, string[]>

export interface RecipeImageCredit {
  author: string
  source: string
  license: string
  licenseUrl: string
}

export interface Recipe {
  id: string
  name: LocalizedText
  description: LocalizedText
  category: Exclude<Category, 'all'>
  minutes: number
  calories: number
  image: string
  imageCredit?: RecipeImageCredit
  alt: LocalizedText
  ingredients: LocalizedList
  steps: LocalizedList
}

export const recipes = recipeData as Recipe[]

export const categories: Category[] = [
  'all',
  'breakfast',
  'lunch',
  'dinner',
  'dessert',
  'vegetarian',
]

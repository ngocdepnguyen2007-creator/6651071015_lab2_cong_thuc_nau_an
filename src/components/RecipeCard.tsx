import { ArrowUpRight, Clock3, GitCompareArrows, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Recipe } from '../data/recipes'
import { useAppContext } from '../context/useAppContext'
import { text } from '../i18n'

interface RecipeCardProps {
  recipe: Recipe
  index: number
  onCompareToggle: (recipe: Recipe, wasSelected: boolean) => void
}

export function RecipeCard({ recipe, index, onCompareToggle }: RecipeCardProps) {
  const { language, compareIds } = useAppContext()
  const copy = text[language]
  const selected = compareIds.includes(recipe.id)
  const imagePosition = ['50% 50%', '50% 54%', '50% 48%', '50% 55%'][index % 4]

  return (
    <article className={`recipe-card${selected ? ' recipe-card-selected' : ''}`}>
      <Link aria-label={`${copy.viewRecipe}: ${recipe.name[language]}`} className="card-image-link" to={`/item/${recipe.id}`}>
        <img
          alt={recipe.alt[language]}
          className="card-image"
          loading="lazy"
          src={recipe.image}
          style={{ objectPosition: imagePosition }}
        />
        <span className="card-category">{copy.categoryLabels[recipe.category]}</span>
        <span className="card-image-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="recipe-card-body">
        <div className="recipe-card-heading">
          <h3><Link to={`/item/${recipe.id}`}>{recipe.name[language]}</Link></h3>
          {recipe.category === 'vegetarian' && <span className="vegetarian-badge" title={copy.categoryLabels.vegetarian}><Leaf size={14} aria-hidden="true" /></span>}
        </div>
        <p className="recipe-description">{recipe.description[language]}</p>
        <div className="card-bottom">
          <span className="card-time"><Clock3 size={15} aria-hidden="true" />{recipe.minutes} {copy.minutes}</span>
          <button
            aria-pressed={selected}
            className={`compare-toggle${selected ? ' compare-toggle-selected' : ''}`}
            onClick={() => onCompareToggle(recipe, selected)}
            type="button"
          >
            <GitCompareArrows size={15} aria-hidden="true" />
            {selected ? copy.removeCompare : copy.addCompare}
          </button>
        </div>
      </div>
    </article>
  )
}

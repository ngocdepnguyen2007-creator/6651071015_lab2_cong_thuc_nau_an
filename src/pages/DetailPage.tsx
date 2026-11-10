import { ArrowLeft, ArrowUpRight, Check, Clock3, Flame, GitCompareArrows, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DetailSkeleton } from '../components/RecipeSkeleton'
import { ImageCredit } from '../components/ImageCredit'
import { RecipeImage } from '../components/RecipeImage'
import { useAppContext } from '../context/useAppContext'
import { recipes } from '../data/recipes'
import { text } from '../i18n'

export function DetailPage() {
  const { id } = useParams()
  const { language, compareIds, toggleCompare, announce } = useAppContext()
  const copy = text[language]
  const [isLoading, setIsLoading] = useState(true)
  const recipe = recipes.find((item) => item.id === id)
  const isSelected = recipe ? compareIds.includes(recipe.id) : false

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 430)
    return () => window.clearTimeout(timeout)
  }, [id])

  const handleCompare = () => {
    if (!recipe) return
    if (!isSelected && compareIds.length >= 3) {
      announce(language === 'vi' ? 'Bạn có thể chọn tối đa 3 món.' : 'You can compare up to 3 dishes.')
      return
    }
    toggleCompare(recipe.id)
    announce(isSelected ? copy.removedFromCompare : copy.selectedForCompare)
  }

  if (!recipe) {
    return (
      <section className="not-found-page">
        <span aria-hidden="true">🥣</span>
        <h1>{language === 'vi' ? 'Chưa tìm thấy công thức' : 'Recipe not found'}</h1>
        <Link className="primary-button" to="/">{copy.backToRecipes}</Link>
      </section>
    )
  }

  if (isLoading) return <DetailSkeleton />

  return (
    <article className="detail-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} aria-hidden="true" />{copy.backToRecipes}</Link>
      <div className="detail-hero">
        <div className="detail-image-wrap">
          <RecipeImage alt={recipe.alt[language]} className="detail-image" src={recipe.image} />
          <span className="detail-category">{copy.categoryLabels[recipe.category]}</span>
          {recipe.imageCredit && <ImageCredit credit={recipe.imageCredit} detail language={language} />}
        </div>
        <div className="detail-intro">
          <span className="eyebrow detail-eyebrow">{copy.detailEyebrow}</span>
          <h1>{recipe.name[language]}</h1>
          <p className="detail-description">{recipe.description[language]}</p>
          <div className="detail-stats">
            <div className="detail-stat"><span className="stat-icon"><Clock3 size={17} aria-hidden="true" /></span><span><small>{copy.cookingTime}</small><strong>{recipe.minutes} {copy.minutes}</strong></span></div>
            <div className="detail-stat"><span className="stat-icon"><UsersRound size={17} aria-hidden="true" /></span><span><small>{copy.servings}</small><strong>{copy.servingValue}</strong></span></div>
            <div className="detail-stat"><span className="stat-icon"><Flame size={17} aria-hidden="true" /></span><span><small>{copy.caloriesLabel}</small><strong>{recipe.calories} {copy.calories}</strong></span></div>
          </div>
          <button className={isSelected ? 'primary-button primary-button-selected' : 'primary-button'} onClick={handleCompare} type="button">
            {isSelected ? <Check size={17} aria-hidden="true" /> : <GitCompareArrows size={17} aria-hidden="true" />}
            {isSelected ? copy.removeCompare : copy.addCompare}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="detail-recipe-content">
        <section className="ingredients-panel">
          <div className="recipe-section-heading"><span className="recipe-section-number">01</span><h2>{copy.ingredientHeading}</h2></div>
          <p className="ingredient-intro">{recipe.ingredients[language].length} {copy.ingredients}</p>
          <ul className="ingredient-list">
            {recipe.ingredients[language].map((ingredient) => <li key={ingredient}><span className="ingredient-check"><Check size={12} aria-hidden="true" /></span>{ingredient}</li>)}
          </ul>
          <span aria-hidden="true" className="ingredients-decoration">✳</span>
        </section>
        <section className="steps-panel">
          <div className="recipe-section-heading"><span className="recipe-section-number">02</span><h2>{copy.stepHeading}</h2></div>
          <ol className="steps-list">
            {recipe.steps[language].map((step, index) => <li key={step}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
          </ol>
        </section>
      </div>
    </article>
  )
}

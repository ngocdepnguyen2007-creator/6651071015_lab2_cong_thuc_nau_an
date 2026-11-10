import { ArrowRight, Clock3, Flame, GitCompareArrows, Leaf, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { recipes } from '../data/recipes'
import { text } from '../i18n'

export function ComparePage() {
  const { language, compareIds, toggleCompare, clearCompare } = useAppContext()
  const copy = text[language]
  const selectedRecipes = compareIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter((recipe) => recipe !== undefined)

  return (
    <section className="compare-page">
      <div className="compare-page-heading">
        <span className="eyebrow"><GitCompareArrows size={15} aria-hidden="true" />{copy.compare}</span>
        <div className="compare-heading-row">
          <div><h1>{copy.compareHeading}</h1><p>{copy.compareSubheading}</p></div>
          {selectedRecipes.length > 0 && (
            <button className="clear-selection" onClick={clearCompare} type="button">
              <Trash2 size={15} aria-hidden="true" />{copy.clearAll}
            </button>
          )}
        </div>
      </div>

      {selectedRecipes.length === 0 ? (
        <div className="compare-empty">
          <span className="compare-empty-icon"><GitCompareArrows size={29} aria-hidden="true" /></span>
          <h2>{copy.emptyCompare}</h2>
          <p>{copy.emptyCompareHint}</p>
          <Link className="primary-button" to="/">{copy.findRecipes}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      ) : (
        <>
          <div className="compare-summary"><span><strong>{selectedRecipes.length}</strong> {copy.selectedCount}</span><span className="compare-limit">{language === 'vi' ? 'Tối đa 3 món' : 'Up to 3 dishes'}</span></div>
          <div className="comparison-table-scroll" role="region" aria-label={copy.compareHeading} tabIndex={0}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col" className="comparison-label-cell">{copy.compare}</th>
                  {selectedRecipes.map((recipe) => (
                    <th className="comparison-recipe-head" key={recipe.id} scope="col">
                      <div className="comparison-recipe-title">
                        <Link className="comparison-title-link" to={`/item/${recipe.id}`}>{recipe.name[language]}</Link>
                        <button aria-label={`${language === 'vi' ? 'Bỏ' : 'Remove'} ${recipe.name[language]}`} className="remove-recipe" onClick={() => toggleCompare(recipe.id)} type="button"><Trash2 size={15} aria-hidden="true" /></button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><Clock3 size={15} aria-hidden="true" />{copy.compareDuration}</th>
                  {selectedRecipes.map((recipe) => <td key={recipe.id}><span className="metric-pill">{recipe.minutes} {copy.minutes}</span></td>)}
                </tr>
                <tr>
                  <th scope="row"><Flame size={15} aria-hidden="true" />{copy.compareCalories}</th>
                  {selectedRecipes.map((recipe) => <td key={recipe.id}><span className="metric-pill">{recipe.calories} {copy.calories}</span></td>)}
                </tr>
                <tr>
                  <th scope="row"><Leaf size={15} aria-hidden="true" />{copy.compareIngredients}</th>
                  {selectedRecipes.map((recipe) => (
                    <td key={recipe.id}>
                      <ul className="comparison-ingredients">
                        {recipe.ingredients[language].map((ingredient) => <li key={ingredient}><span aria-hidden="true">·</span>{ingredient}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">{copy.compareSteps}</th>
                  {selectedRecipes.map((recipe) => (
                    <td key={recipe.id}>
                      <ol className="comparison-steps">
                        {recipe.steps[language].map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
                      </ol>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {selectedRecipes.length < 3 && (
            <Link className="add-more-link" to="/"><span className="add-more-icon">+</span>{copy.addMore}<ArrowRight size={15} aria-hidden="true" /></Link>
          )}
        </>
      )}
    </section>
  )
}

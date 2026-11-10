import { ArrowDownWideNarrow, Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeImage } from '../components/RecipeImage'
import { RecipeSkeleton } from '../components/RecipeSkeleton'
import { categories, recipes, type Category, type Recipe } from '../data/recipes'
import { useAppContext } from '../context/useAppContext'
import { text } from '../i18n'

export function ListPage() {
  const { language, compareIds, toggleCompare, announce } = useAppContext()
  const copy = text[language]
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [query, setQuery] = useState('')
  const [maxMinutes, setMaxMinutes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 620)
    return () => window.clearTimeout(timeout)
  }, [])

  const visibleRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(language)
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
      const matchesQuery = !normalizedQuery
        || recipe.name[language].toLocaleLowerCase(language).includes(normalizedQuery)
        || recipe.description[language].toLocaleLowerCase(language).includes(normalizedQuery)
        || recipe.ingredients[language].some((ingredient) => ingredient.toLocaleLowerCase(language).includes(normalizedQuery))
      const matchesTime = maxMinutes === 0 || recipe.minutes <= maxMinutes
      return matchesCategory && matchesQuery && matchesTime
    })
  }, [language, maxMinutes, query, selectedCategory])

  const handleCompareToggle = (recipe: Recipe, wasSelected: boolean) => {
    if (!wasSelected && compareIds.length >= 3) {
      announce(language === 'vi' ? 'Bạn có thể chọn tối đa 3 món.' : 'You can compare up to 3 dishes.')
      return
    }
    toggleCompare(recipe.id)
    announce(wasSelected ? copy.removedFromCompare : copy.selectedForCompare)
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} aria-hidden="true" />{copy.heroEyebrow}</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroDescription}</p>
            <button className="hero-cta" onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })} type="button">
              {copy.home}<span aria-hidden="true">↘</span>
            </button>
          </div>
          <div aria-label="Món ăn tươi ngon được bày trong tô" className="hero-art" role="img">
            <div className="hero-photo">
              <RecipeImage alt="" fetchPriority="high" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=960&q=85" />
            </div>
            <div className="hero-sticker"><span className="sticker-star">✳</span><span>{copy.featureEyebrow}<br /><strong>{copy.feature}</strong></span></div>
            <span className="hero-orbit hero-orbit-one" />
            <span className="hero-orbit hero-orbit-two" />
          </div>
          <div className="hero-count"><span>21</span><span>{copy.recipeCount}<br />{language === 'vi' ? 'đang chờ bạn' : 'to explore'}</span></div>
        </div>
        <div className="hero-bottom-line"><span />{language === 'vi' ? 'CHỌN MÓN · VÀO BẾP · TẬN HƯỞNG' : 'PICK A RECIPE · GET COOKING · ENJOY'}</div>
      </section>

      <section className="discovery-section" id="recipes">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{copy.categoryHeading}</span>
            <h2>{copy.collectionHeading}</h2>
            <p>{copy.collectionDescription}</p>
          </div>
          <span className="section-recipe-total">{recipes.length} {copy.recipeCount}</span>
        </div>

        <div className="filter-toolbar">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{copy.searchLabel}</span>
            <input onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} type="search" value={query} />
            {query && <button aria-label={language === 'vi' ? 'Xóa nội dung tìm kiếm' : 'Clear search'} className="search-clear" onClick={() => setQuery('')} type="button">×</button>}
          </label>
          <label className="duration-filter">
            <ArrowDownWideNarrow size={16} aria-hidden="true" />
            <span className="sr-only">{copy.durationLabel}</span>
            <select onChange={(event) => setMaxMinutes(Number(event.target.value))} value={maxMinutes}>
              <option value={0}>{copy.anyDuration}</option>
              <option value={30}>{copy.under30}</option>
              <option value={45}>{copy.under45}</option>
            </select>
          </label>
        </div>

        <div aria-label={copy.categoryHeading} className="category-list" role="group">
          {categories.map((category) => (
            <button
              aria-pressed={selectedCategory === category}
              className={`category-chip${selectedCategory === category ? ' category-chip-active' : ''}`}
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {copy.categoryLabels[category]}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="results-line">
          <span>{language === 'vi' ? 'Đang hiển thị' : 'Showing'} <strong>{isLoading ? recipes.length : visibleRecipes.length}</strong> {copy.recipeCount}</span>
          <span className="results-selection">{compareIds.length > 0 ? `${compareIds.length}/3 ${copy.selectedCount}` : ''}</span>
        </div>

        {isLoading ? <RecipeSkeleton /> : visibleRecipes.length > 0 ? (
          <div className="recipe-grid">
            {visibleRecipes.map((recipe, index) => (
              <RecipeCard index={index} key={recipe.id} onCompareToggle={handleCompareToggle} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <span aria-hidden="true">⌕</span>
            <h3>{copy.noRecipes}</h3>
            <p>{copy.noRecipesHint}</p>
            <button className="text-button" onClick={() => { setQuery(''); setSelectedCategory('all'); setMaxMinutes(0) }} type="button">
              {language === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
            </button>
          </div>
        )}
      </section>
    </>
  )
}

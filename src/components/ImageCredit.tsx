import type { Language, RecipeImageCredit } from '../data/recipes'

interface ImageCreditProps {
  credit: RecipeImageCredit
  language: Language
  detail?: boolean
}

export function ImageCredit({ credit, language, detail = false }: ImageCreditProps) {
  return (
    <span className={`image-credit${detail ? ' image-credit-detail' : ''}`}>
      <a href={credit.source} rel="noreferrer" target="_blank">
        {language === 'vi' ? 'Ảnh' : 'Photo'}: {credit.author}
      </a>
      {' · '}
      <a href={credit.licenseUrl} rel="noreferrer" target="_blank">
        {credit.license}
      </a>
      {' · '}
      {language === 'vi' ? 'đã cắt khung' : 'cropped'}
    </span>
  )
}

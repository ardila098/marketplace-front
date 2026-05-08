import { dataService } from './dataService'

export const translationService = {
  translateText: payload => dataService.post('/translations/text', payload),
  translateProductDraft: payload => dataService.post('/translations/product-draft', payload),
}

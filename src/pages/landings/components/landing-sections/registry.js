import HeroSection from './HeroSection'
import CardsSection from './CardsSection'
import SliderSection from './SliderSection'
import { LANDING_SECTION_TYPES } from '../../../../constants/landingSections'


export const SECTION_COMPONENT_REGISTRY = {
  [LANDING_SECTION_TYPES.HERO.value]: HeroSection,
  [LANDING_SECTION_TYPES.CARDS.value]: CardsSection,
  [LANDING_SECTION_TYPES.SLIDER.value]: SliderSection,
}

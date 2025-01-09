import type { File, Message, User } from '@shared/pack'

export interface Activity {
  type: string
  status: string
  description: string
}

export enum CompanyDetailsNav {
  OVERVIEW = 'overview',
  JOBS = 'jobs',
  REVIEWS = 'reviews'
}

export const CompanyDetailsNavMap = {
  [CompanyDetailsNav.OVERVIEW]: 'Overview',
  [CompanyDetailsNav.JOBS]: 'Jobs',
  [CompanyDetailsNav.REVIEWS]: 'Reviews'
}

export interface Convo {
  id: number
  is_pinned: boolean
  sender: ConvoMember
  receviers: ConvoMember[]
  last_message?: Message<Object, User, File>
  messages: Message<Object, User, File>[]
}

export interface ConvoMember {
  user?: User
  user_id: number
  full_name: string
  is_active: boolean
  is_typing?: boolean
}

export const enum EmojiCategory {
  SMILEYS_AND_PEOPLE = 'smileys-and-people',
  ANIMALS_AND_NATURE = 'animals-and-nature',
  FOOD_AND_DRINK = 'food-and-drink',
  TRAVEL_AND_PLACES = 'travel-and-places',
  ACTIVITIES = 'activities',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags'
}

/**
 * body, cat-face, clothing, creature-face, emotion, face-negative, face-neutral, face-positive, face-positive, face-role, face-sick, family, monkey-face, person, person-activity, person-gesture, person-role, skin-tone
 * animal-amphibian, animal-bird, animal-bug, animal-mammal, animal-marine, animal-reptile, plant-flower, plant-other
 * dishware, drink, food-asian, food-fruit, food-prepared, food-sweet, food-vegetable
 * travel-and-places
 * activities
 * objects
 * symbols
 * flags
 */
export const enum EmojiGroup {
  BODY = 'body',
  CAT_FACE = 'cat-face',
  CLOTHING = 'clothing',
  CREATURE_FACE = 'creature-face',
  EMOTION = 'emotion',
  FACE_NEGATIVE = 'face-negative',
  FACE_NEUTRAL = 'face-neutral',
  FACE_POSITIVE = 'face-positive',
  FACE_ROLE = 'face-role',
  FACE_SICK = 'face-sick',
  FAMILY = 'family',
  MONKEY_FACE = 'monkey-face',
  PERSON = 'person',
  PERSON_ACTIVITY = 'person-activity',
  PERSON_GESTURE = 'person-gesture',
  PERSON_ROLE = 'person-role',
  SKIN_TONE = 'skin-tone',
  ANIMAL_AMPHIBIAN = 'animal-amphibian',
  ANIMAL_BIRD = 'animal-bird',
  ANIMAL_BUG = 'animal-bug',
  ANIMAL_MAMMAL = 'animal-mammal',
  ANIMAL_MARINE = 'animal-marine',
  ANIMAL_REPTILE = 'animal-reptile',
  PLANT_FLOWER = 'plant-flower',
  PLANT_OTHER = 'plant-other',
  DISHWARE = 'dishware',
  DRINK = 'drink',
  FOOD_ASIAN = 'food-asian',
  FOOD_FRUIT = 'food-fruit',
  FOOD_PREPARED = 'food-prepared',
  FOOD_SWEET = 'food-sweet',
  FOOD_VEGETABLE = 'food-vegetable',
  TRAVEL_AND_PLACES = 'travel-and-places',
  ACTIVITIES = 'activities',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags'
}

export interface Emoji {
  name: string
  category: EmojiCategory
  group: EmojiGroup
  htmlCode: string[]
  unicode: string[]
}

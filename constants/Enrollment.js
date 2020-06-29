import Language from '../languages'


export const Gender = {
   Select: "",
   Male: "M",
  Female: "F",
  Other: "other",
}

export const City = {
  Select: "",
  Nairobi: "Nairobi",
 Mombasa: "Mombasa",
 Kisumu: "Kisumu",
}


export const CityStrings = {
  [City.Select]: Language.Select,
  [City.Nairobi]: Language.Nairobi,
  [City.Mombasa]: Language.Mombasa,
  [City.Kisumu]: Language.Kisumu,
}

export const GenderStrings = {
  [Gender.Select]: Language.Select,
  [Gender.Male]: Language.Male,
  [Gender.Female]: Language.Female,
  [Gender.Other]: Language.Other,
}

export const Relation = {
  Mother: "mother",
  Father: "father",
  Sister: "sister",
  Brother: "brother",
  Aunt: "aunt",
  Uncle: "uncle",
  Grandmother: "grandmother",
  Grandfather: "grandfather",
}


export const RelationStrings = {
  [Relation.Mother]: Language.Mother,
  [Relation.Father]: Language.Father,
  [Relation.Sister]: Language.Sister,
  [Relation.Brother]: Language.Brother,
  [Relation.Aunt]: Language.Aunt,
  [Relation.Uncle]: Language.Uncle,
  [Relation.Grandmother]: Language.Grandmother,
  [Relation.Grandfather]: Language.Grandfather,
}


export const SET_RATE = 'enrollment:set_rate'
export const SET_FREQUENCY = 'enrollment:set_frequency'
export const SET_NEW_CHILD = 'enrollment:set_new_child'
export const SET_NEW_GUARDIAN = 'enrollment:set_new_guardian'
export const SET_NEW_CONTACT = 'enrollment:set_new_contact'
export const SET_NEW_HOF = 'enrollment:set_new_hof'
export const DELETE_NEW_CHILD = 'enrollment:delete_new_child'
export const DELETE_NEW_CONTACT = 'enrollment:delete_new_contact'
export const DELETE_NEW_GUARDIAN = 'enrollment:delete_new_guardian'
export const CLEAR_NEW_ACCOUNT = 'enrollment:clear_new_account'

import Language from '../languages'

export const SET_FINANCES = 'expenses:set_finances'
export const DELETE_FINANCES = 'expenses:delete_finances'
export const UPDATE_EXPENSES = 'expenses:update_expenses'
export const UPDATE_EXPENSE = 'expenses:update_expense'
export const UPDATE_INCOME = 'payments:update_income'
export const UPDATE_PAYMENT = 'payments:update_payment'
export const SET_PAYMENTS = 'payments:set_payments'
export const DELETE_PAYMENTS = 'payments:delete_payments'
export const SET_EXPENSES = 'expenses:set_expenses'
export const DELETE_EXPENSES = 'expenses:delete_expenses'
export const ADD_PAYMENT = 'payments:add_payment'
export const ADD_EXPENSE = 'expenses:add_expense'


export const Frequency = {
  Daily: "daily",
  Weekly: "weekly",
  Termly: "termly",
}


export const FeeDelta = {
  [Frequency.Daily]: 1,
  [Frequency.Weekly]: 7,
  [Frequency.Termly]: 90,
}


export const FrequencyStrings = {
  [Frequency.Daily]: Language.Daily,
  [Frequency.Weekly]: Language.Weekly,
  [Frequency.Termly]: Language.Termly,
}


export const PaymentType = {
  mpesa: "mpesa",
  cash: "cash",
}


export const ExpenseType = {
  Rent: "rent",
  Water: "water",
  Food: "food",
  Fuel: "fuel",
  Electricity: "electricity",
  Salary: "salary",
  Equipment: "equipment",
}


export const FinanceType = {
  ...PaymentType,
  ...ExpenseType,
}


export const FinanceTypeNames = {
  [FinanceType.Rent]: Language.Rent,
  [FinanceType.Water]: Language.Water,
  [FinanceType.Food]: Language.Food,
  [FinanceType.Fuel]: Language.Fuel,
  [FinanceType.Electricity]: Language.Electricity,
  [FinanceType.Salary]: Language.Salary,
  [FinanceType.Equipment]: Language.Equipment,
  [FinanceType.mpesa]: Language.mpesa,
  [FinanceType.cash]: Language.cash,
}


export const FinanceTypeIcons = {
  [FinanceType.Rent]: 'home',
  [FinanceType.Water]: 'tint',
  [FinanceType.Food]: 'spoon',
  [FinanceType.Fuel]: 'fire',
  [FinanceType.Electricity]: 'bolt',
  [FinanceType.Salary]: 'money',
  [FinanceType.Equipment]: 'book',
  [FinanceType.mpesa]: 'comment',
  [FinanceType.cash]: 'dollar',
}

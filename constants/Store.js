import {
  createCaregiver,
  createGuardian,
  createContact,
  createChild,
  createAttendance,
  createFinances,
  createExpense,
  createPayment,
  createQuestion,
  createResponse,
  createAccount
} from "../src/graphql/mutations"
import {
  getCaregiver,
  getGuardian,
  getContact,
  getChild,
  getAttendance,
  getFinances,
  getExpense,
  getPayment,
  getQuestion,
  getResponses,
  getAccount,
  listCaregivers,
  listGuardians,
  listContacts,
  listChilds,
  listAttendances,
  listFinancess,
  listPayments,
  listExpenses,
  listQuestions,
  listResponses,
  listAccounts,
} from "../src/graphql/queries"


export const CAREGIVER = 'Caregiver'
export const RESPONSES = 'Responses'
export const GUARDIANS = 'Guardians'
export const CONTACTS = 'Contacts'
export const CHILDREN = 'Children'
export const ATTENDANCE = 'Attendance'
export const FINANCES = 'Finances'
export const EXPENSES = 'Expenses'
export const PAYMENTS = 'Payments'
export const QUESTIONS = 'Questions'
export const ACCOUNTS = 'Accounts'
export const HOFS = 'Hofs'


export const QueryGetTypes = {
  [CAREGIVER]: getCaregiver,
  [ACCOUNTS]: getAccount,
  [GUARDIANS]: getGuardian,
  [CONTACTS]: getContact,
  [CHILDREN]: getChild,
  [ATTENDANCE]: getAttendance,
  [FINANCES]: getFinances,
  [EXPENSES]: getExpense,
  [PAYMENTS]: getPayment,
  [QUESTIONS]: getQuestion,
  [RESPONSES]: getResponses,
}


export const QueryListTypes = {
  [CAREGIVER]: listCaregivers,
  [ACCOUNTS]: listAccounts,
  [GUARDIANS]: listGuardians,
  [CONTACTS]: listContacts,
  [CHILDREN]: listChilds,
  [ATTENDANCE]: listAttendances,
  [FINANCES]: listFinancess,
  [EXPENSES]: listExpenses,
  [PAYMENTS]: listPayments,
  [QUESTIONS]: listQuestions,
  [RESPONSES]: listResponses,
}


export const MutationTypes = {
  [CAREGIVER]: createCaregiver,
  [ACCOUNTS]: createAccount,
  [GUARDIANS]: createGuardian,
  [CONTACTS]: createContact,
  [CHILDREN]: createChild,
  [ATTENDANCE]: createAttendance,
  [FINANCES]: createFinances,
  [EXPENSES]: createExpense,
  [PAYMENTS]: createPayment,
  [QUESTIONS]: createQuestion,
  [RESPONSES]: createResponse,
}
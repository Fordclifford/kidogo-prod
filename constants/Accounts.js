
import Language from '../languages'

export const Tab = {
  Dash: "dash",
  Accounts: "accounts",
  Upload: "upload",
  Profile:"profile"
}

export const TabNames = {
  [Tab.Dash]: Language.Dash,
  [Tab.Accounts]: Language.Families,
  [Tab.Upload]: Language.Upload,
  [Tab.Profile]: Language.Profile,
}



export const SET_ACCOUNT = 'accounts:set_account'
export const UPDATE_ACCOUNT = 'accounts:update_account'
export const DELETE_ACCOUNT = 'accounts:delete_account'

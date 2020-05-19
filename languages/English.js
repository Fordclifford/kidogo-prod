const App = {
  Dash: "Menu",
  SignIn: "Sign In",
  Reset: "Reset Password",
  SignOut: "Sign Out",
  CheckIn: "Check In",
  Profile:"Profile",
  CheckOut: "Check Out",
  Attendance: "Attendance",
  Finances: "Finances",
  DailyQuestions: "Daily Questions",
  Upload: "Upload",
}


const General = {
  Yes: "Yes",
  No: "No",
  True: "True",
  Select: "Select",
  False: "False",
  And: "and",
  Or: "or",
}


const Keywords = {
  Add: "Add",
  New: "New",
  Edit: "Edit",
  Other: "Other",
  Submit: "Submit",
  Confirm: "Confirm",
  Cancel: "Cancel",
  Date: "Date",
  Username: "Username",
  Password: "Password",
  Next: "Next",
  Delete: "Delete",
  Resend: "Resend",
}


const Members = {
  Caregiver: "Mamapreneur",
  Child: "Child",
  Children: "Children",
  Guardian: "Parent",
  Guardians: "Parents",
  Contact: "Contact",
  Contacts: "Contacts",
  Family: "Family",
  Families: "Families",
}


const Relations = {
  Relationship: "Relationship",
  Mother: "Mother",
  Father: "Father",
  Sister: "Sister",
  Brother: "Brother",
  Aunt: "Aunt",
  Uncle: "Uncle",
  Grandmother: "Grandmother",
  Grandfather: "Grandfather",
}


const Attributes = {
  FirstName: "First Name",
  LastName: "Last Name",
  Gender: "Gender",
  Male: "Male",
  Female: "Female",
  Email: "Email",
  Birthday: "Birthday",
  Location: "Location",
  City: "City",
  Phone: "Phone",
  Notes: "Notes",
  Immunization: "Immunization",
  IdentificationNumber: "Identification Number",
}


const Finances = {
  Fee: "Fee",
  Type: "Type",
  Amount: "Amount",
  Balance: "Balance",
  Rate: "Rate",
  Frequency: "Frequency",
  Daily: "Daily",
  Weekly: "Weekly",
  Termly: "Termly",
  Rent: "Rent",
  Water: "Water",
  Food: "Food",
  Fuel: "Fuel",
  Electricity: "Electricity",
  Salary: "Salary",
  Equipment: "Equipment",
  WeekTotal: "Week Total",
  Payment: "Payment",
  Expense: "Expense",
  MPesa: "M-Pesa",
  Cash: "Cash",
  ThisAccountPays: "This account pays",
}

const Center={
  centreName:"Centre Name",
  address:"Address",
  location:"Location",
  city:"City"
}

const Other = {
  MorningGreeting: "Who's here today?",
  AfternoonGreeting: "Has anyone left?",
  EveningGreeting: "Did you buy anything today?",
  CodeMessage: `
    You will receive a text message with a 6-digit code.
    Please enter the code below:
  `,
  CodeMsg:  "Verification code ",
  InvalidPassword:"Invalid password provided",
  InvalidUsername:"'Invalid username provided",
  ResetMessage:"You need to reset password to continue",
  ResetTitle:"Reset Password",
  AccountNotConfirmed:"'Account not confirmed",
  UnknownError:"Technical error occured try again later",
  NetwordError:"Network time out try again",
  ResetPassword:"Forgot password?",
  InvalidCode:"Invalid Code, resend code",
  SendCode:"Send code",
  CodeMissing:"Confirmation code is missing",
  PasswordMismatch:'Password confirmation does not match',
  ResetSuccessful:'Password reset successfully',
  usernameEmpty:"Username required",
  passwordEmpty:"password required"
}


export default English = {
  ...App,
  ...General,
  ...Keywords,
  ...Members,
  ...Relations,
  ...Attributes,
  ...Finances,
  ...Other,
  ...Center,
}


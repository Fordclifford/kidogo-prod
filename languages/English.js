const App = {
  Dash: "Menu",
  SignIn: "Sign In",
  Reset: "Reset Password",
  SignOut: "Sign Out",
  CheckIn: "Check In",
  Profile:"Profile",
  CheckOut: "Check Out",
  Attendance: "Attendance",
  AttendanceSummary: "Attendance Summary",
  Finances: "Finances",
  DailyQuestions: "The Kidogo Way",
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
  HOF: "Head of Family",
  FAM: "Family Member",
  Contact: "Contact",
  Country: "Country",
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
  JoinedDate:"Joined On",
  Immunization: "Immunization",
  IdentificationNumber: "Identification Number",
   Nairobi:"Nairobi",
   Mombasa:"Mombasa",
   Kisumu:"Kisumu",

}


const Finances = {
  Action:"Action",
  PaymentFor:"For",
  Fee: "Fee",
  Type: "Type",
  Amount: "Amount",
  Balance: "Balance",
  Rate: "Pays",
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
  mpesa: "M-Pesa",
  cash: "Cash",
  ThisAccountPays: "This account pays",
  Income:"Income",
  Total:'Total',
  Profit:'Profit',
  Loss:'Loss'
}

const Center={
  centreName:"Centre Name",
  address:"Address",
  location:"County",
  city:"City"
}

const Other = {
  FamilyAddesSuccessfully:"Family added successfully",
  QuestionsAnswered:"All Questions already answered",
  Immunized:"Child Immunized",
  NotImmunized:"Child not Immunized",
  ConfirmUpload: "Sure to upload?",
  EveningGreeting: "Did you buy anything today?",
  MorningGreeting:"Has anyone attended?",
  AfternoonGreeting:"Has anyone left?",
  CodeMessage: `
    You will receive a text message with a 6-digit code.
    Please enter the code below:
  `,
  CodeMsg:  "Verification code ",
  VerifyCode:  "Your Verification code is ",
  InvalidPassword:"Invalid password provided",
  InvalidUsername:"Invalid phone number provided",
  InvalidUsernameOrPassword:"Invalid phone/password provided",
  ResetMessage:"You need to reset password to continue",
  ResetTitle:"Reset Password",
  AccountNotConfirmed:"Account not confirmed",
  UnknownError:"Technical error occured try again later",
  NetwordError:"Network time out try again",
  ResetPassword:"Forgot password?",
  InvalidCode:"Invalid Code, resend code",
  SendCode:"Send code",
  CodeMissing:"Confirmation code is missing",
  PasswordMismatch:'Password confirmation does not match',
  ResetSuccessful:'Password reset successfully',
  LoginSuccessful:'Login Successful',
  usernameEmpty:"Username required",
  DuplicatePhone:"Pnone number already registered! Recover your account",
  passwordEmpty:"password required",
  LocationRequired:"Location required",
  CityRequired:"City required",
  CenterRequired:"Center name required",
  SignupSuccessful:"Signup successful"
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


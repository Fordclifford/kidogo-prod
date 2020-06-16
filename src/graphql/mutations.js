/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCaregiver = /* GraphQL */ `
  mutation CreateCaregiver(
    $input: CreateCaregiverInput!
    $condition: ModelCaregiverConditionInput
  ) {
    createCaregiver(input: $input, condition: $condition) {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      
      city
      lastUpdate
      accounts {
        items {
          id
          balance
          rate
          frequency
          lastFee
        }
        nextToken
      }
    }
  }
`;
export const updateCaregiver = /* GraphQL */ `
  mutation UpdateCaregiver(
    $input: UpdateCaregiverInput!
    $condition: ModelCaregiverConditionInput
  ) {
    updateCaregiver(input: $input, condition: $condition) {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      
      city
      lastUpdate
      accounts {
        items {
          id
          balance
          rate
          frequency
          lastFee
        }
        nextToken
      }
    }
  }
`;
export const deleteCaregiver = /* GraphQL */ `
  mutation DeleteCaregiver(
    $input: DeleteCaregiverInput!
    $condition: ModelCaregiverConditionInput
  ) {
    deleteCaregiver(input: $input, condition: $condition) {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      
      city
      lastUpdate
      accounts {
        items {
          id
          balance
          rate
          frequency
          lastFee
        }
        nextToken
      }
    }
  }
`;
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
      id
      balance
      rate
      frequency
      lastFee
      caregiver {
        id
        username
        email
        password
        phone
        firstName
        lastName
        centreName
        location
        
        city
        lastUpdate
        accounts {
          nextToken
        }
      }
      children {
        items {
          id
          firstName
          lastName
          birthdate
          gender
          note
        }
        nextToken
      }
      guardians {
        items {
          id
          firstName
          lastName
          phone
          govtId
          relation
          address
          city
        }
        nextToken
      }
      contacts {
        items {
          id
          firstName
          lastName
          phone
        }
        nextToken
      }
      attendance {
        items {
          date
          checkIn
          checkOut
        }
        nextToken
      }
      finances {
        items {
          date
          income
          expenses
        }
        nextToken
      }
      payments {
        items {
          date
          type
          amount
        }
        nextToken
      }
      expenses {
        items {
          date
          type
          amount
        }
        nextToken
      }
      questions {
        items {
          text
          response
        }
        nextToken
      }
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
      id
      balance
      rate
      frequency
      lastFee
      caregiver {
        id
        username
        email
        password
        phone
        firstName
        lastName
        centreName
        location
        
        city
        lastUpdate
        accounts {
          nextToken
        }
      }
      children {
        items {
          id
          firstName
          lastName
          birthdate
          gender
          note
        }
        nextToken
      }
      guardians {
        items {
          id
          firstName
          lastName
          phone
          govtId
          relation
          address
          city
        }
        nextToken
      }
      contacts {
        items {
          id
          firstName
          lastName
          phone
        }
        nextToken
      }
      attendance {
        items {
          date
          checkIn
          checkOut
        }
        nextToken
      }
      finances {
        items {
          date
          income
          expenses
        }
        nextToken
      }
      payments {
        items {
          date
          type
          amount
        }
        nextToken
      }
      expenses {
        items {
          date
          type
          amount
        }
        nextToken
      }
      questions {
        items {
          text
          response
        }
        nextToken
      }
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
      id
      balance
      rate
      frequency
      lastFee
      caregiver {
        id
        username
        email
        password
        phone
        firstName
        lastName
        centreName
        location
        
        city
        lastUpdate
        accounts {
          nextToken
        }
      }
      children {
        items {
          id
          firstName
          lastName
          birthdate
          gender
          note
        }
        nextToken
      }
      guardians {
        items {
          id
          firstName
          lastName
          phone
          govtId
          relation
          address
          city
        }
        nextToken
      }
      contacts {
        items {
          id
          firstName
          lastName
          phone
        }
        nextToken
      }
      attendance {
        items {
          date
          checkIn
          checkOut
        }
        nextToken
      }
      finances {
        items {
          date
          income
          expenses
        }
        nextToken
      }
      payments {
        items {
          date
          type
          amount
        }
        nextToken
      }
      expenses {
        items {
          date
          type
          amount
        }
        nextToken
      }
      questions {
        items {
          text
          response
        }
        nextToken
      }
    }
  }
`;
export const createChild = /* GraphQL */ `
  mutation CreateChild(
    $input: CreateChildInput!
    $condition: ModelChildConditionInput
  ) {
    createChild(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      birthdate
      gender
      note
    }
  }
`;
export const updateChild = /* GraphQL */ `
  mutation UpdateChild(
    $input: UpdateChildInput!
    $condition: ModelChildConditionInput
  ) {
    updateChild(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      birthdate
      gender
      note
    }
  }
`;
export const deleteChild = /* GraphQL */ `
  mutation DeleteChild(
    $input: DeleteChildInput!
    $condition: ModelChildConditionInput
  ) {
    deleteChild(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      birthdate
      gender
      note
    }
  }
`;
export const createGuardian = /* GraphQL */ `
  mutation CreateGuardian(
    $input: CreateGuardianInput!
    $condition: ModelGuardianConditionInput
  ) {
    createGuardian(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
      govtId
      relation
      address
      city
    }
  }
`;
export const updateGuardian = /* GraphQL */ `
  mutation UpdateGuardian(
    $input: UpdateGuardianInput!
    $condition: ModelGuardianConditionInput
  ) {
    updateGuardian(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
      govtId
      relation
      address
      city
    }
  }
`;
export const deleteGuardian = /* GraphQL */ `
  mutation DeleteGuardian(
    $input: DeleteGuardianInput!
    $condition: ModelGuardianConditionInput
  ) {
    deleteGuardian(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
      govtId
      relation
      address
      city
    }
  }
`;
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
    }
  }
`;
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
    }
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
      id
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      firstName
      lastName
      phone
    }
  }
`;
export const createAttendance = /* GraphQL */ `
  mutation CreateAttendance(
    $input: CreateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    createAttendance(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      checkIn
      checkOut
    }
  }
`;
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance(
    $input: UpdateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    updateAttendance(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      checkIn
      checkOut
    }
  }
`;
export const deleteAttendance = /* GraphQL */ `
  mutation DeleteAttendance(
    $input: DeleteAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    deleteAttendance(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      checkIn
      checkOut
    }
  }
`;
export const createFinances = /* GraphQL */ `
  mutation CreateFinances(
    $input: CreateFinancesInput!
    $condition: ModelFinancesConditionInput
  ) {
    createFinances(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      income
      expenses
    }
  }
`;
export const updateFinances = /* GraphQL */ `
  mutation UpdateFinances(
    $input: UpdateFinancesInput!
    $condition: ModelFinancesConditionInput
  ) {
    updateFinances(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      income
      expenses
    }
  }
`;
export const deleteFinances = /* GraphQL */ `
  mutation DeleteFinances(
    $input: DeleteFinancesInput!
    $condition: ModelFinancesConditionInput
  ) {
    deleteFinances(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      income
      expenses
    }
  }
`;
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const createExpense = /* GraphQL */ `
  mutation CreateExpense(
    $input: CreateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    createExpense(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const updateExpense = /* GraphQL */ `
  mutation UpdateExpense(
    $input: UpdateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    updateExpense(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const deleteExpense = /* GraphQL */ `
  mutation DeleteExpense(
    $input: DeleteExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    deleteExpense(input: $input, condition: $condition) {
      date
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      type
      amount
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      response
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      response
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
      }
      response
    }
  }
`;
export const createResponse = /* GraphQL */ `
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponsenConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
        responses {
          nextToken
        }
      }
      response
    }
  }
`;
export const updateResponse = /* GraphQL */ `
  mutation UpdateResponse(
    $input: UpdateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    updateResponse(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
        responses {
          nextToken
        }
      }
      response
    }
  }
`;
export const deleteResponse = /* GraphQL */ `
  mutation DeleteResponse(
    $input: DeleteResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    deleteResponse(input: $input, condition: $condition) {
      text
      account {
        id
        balance
        rate
        frequency
        lastFee
        caregiver {
          id
          username
          email
          password
          phone
          firstName
          lastName
          centreName
          location
          
          city
          lastUpdate
        }
        children {
          nextToken
        }
        guardians {
          nextToken
        }
        contacts {
          nextToken
        }
        attendance {
          nextToken
        }
        finances {
          nextToken
        }
        payments {
          nextToken
        }
        expenses {
          nextToken
        }
        questions {
          nextToken
        }
        responses {
          nextToken
        }
      }
      response
    }
  }
`;
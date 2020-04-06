/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCaregiver = /* GraphQL */ `
  subscription OnCreateCaregiver {
    onCreateCaregiver {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      address
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
export const onUpdateCaregiver = /* GraphQL */ `
  subscription OnUpdateCaregiver {
    onUpdateCaregiver {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      address
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
export const onDeleteCaregiver = /* GraphQL */ `
  subscription OnDeleteCaregiver {
    onDeleteCaregiver {
      id
      username
      email
      password
      phone
      firstName
      lastName
      centreName
      location
      address
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
        address
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
        address
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
        address
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
export const onCreateChild = /* GraphQL */ `
  subscription OnCreateChild {
    onCreateChild {
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
          address
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
export const onUpdateChild = /* GraphQL */ `
  subscription OnUpdateChild {
    onUpdateChild {
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
          address
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
export const onDeleteChild = /* GraphQL */ `
  subscription OnDeleteChild {
    onDeleteChild {
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
          address
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
export const onCreateGuardian = /* GraphQL */ `
  subscription OnCreateGuardian {
    onCreateGuardian {
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
          address
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
export const onUpdateGuardian = /* GraphQL */ `
  subscription OnUpdateGuardian {
    onUpdateGuardian {
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
          address
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
export const onDeleteGuardian = /* GraphQL */ `
  subscription OnDeleteGuardian {
    onDeleteGuardian {
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
          address
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
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact {
    onCreateContact {
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
          address
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact {
    onUpdateContact {
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
          address
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact {
    onDeleteContact {
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
          address
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
export const onCreateAttendance = /* GraphQL */ `
  subscription OnCreateAttendance {
    onCreateAttendance {
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
          address
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
export const onUpdateAttendance = /* GraphQL */ `
  subscription OnUpdateAttendance {
    onUpdateAttendance {
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
          address
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
export const onDeleteAttendance = /* GraphQL */ `
  subscription OnDeleteAttendance {
    onDeleteAttendance {
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
          address
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
export const onCreateFinances = /* GraphQL */ `
  subscription OnCreateFinances {
    onCreateFinances {
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
          address
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
export const onUpdateFinances = /* GraphQL */ `
  subscription OnUpdateFinances {
    onUpdateFinances {
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
          address
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
export const onDeleteFinances = /* GraphQL */ `
  subscription OnDeleteFinances {
    onDeleteFinances {
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
          address
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment {
    onCreatePayment {
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
          address
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment {
    onUpdatePayment {
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
          address
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment {
    onDeletePayment {
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
          address
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
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense {
    onCreateExpense {
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
          address
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
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense {
    onUpdateExpense {
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
          address
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
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense {
    onDeleteExpense {
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
          address
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
          address
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
          address
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
          address
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

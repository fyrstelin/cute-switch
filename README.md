# Cute Switch

This package brings in a cute switch as opposed to the built in silly switch:

## Basic switching
```javascript
// Switch statements just comes with a lot of boiler plate
function sillyReact(language) {
  let res
  switch (language) {
    case 'javascript':
      res = 'Ok'
      break
    case 'typescript':
      res = 'Great!'
      break
    case 'python':
      res = 'Oh oh!'
      break
    default:
      res = `What is ${language}?`
      break
  }

  console.log(res)
}

// Objects are quite cool. Default case is a bit subtle
function objectReact(language) {
  const res = {
    javascript: 'Ok',
    typescrtip: 'Great!',
    python: 'Oh oh!'
  }[language] ?? `What is ${language}?`

  console.log(res)
}
function cuteReact(language) {
  const res = Switch(language)
    .case('javascript', () => 'Ok')
    .case('typescript', () => 'Great!')
    .case('python', () => 'Oh oh!')
    .defaultTo(() => `What is ${language}?`)

  console.log(res)
}
```

## Class based switching
Often you need to switch on a class/prototype:

```javascript
class User {
  constructor(firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname
  }
}

class Company {
  constructor(name) {
    this.name = name
  }
}

function sillyGetName(userOrCompany) {
  return userOrCompany instanceof User
    ? [userOrCompany.firstname, userOrCompany.lastname].join(' ')
    : userOrCompany.name
  }
}

function cuteGetName(userOfCompany) {
  return Switch(userOrCompany)
    .match(User, user => [user.firstname, user.lastname].join(' '))
    .match(Company, company => company.name)
    .orThrow()
}
```

## Prop switching
But wait - there is more. To avoid using classes, developers tend to use discriminated union. Those you can switch on as well.

```typescript
type User {
  $type: 'USER'
  firstname: string
  lastname: string
}

type Company {
  $type: 'COMPANY'
  name: string
}

function sillyGetName(userOrCompany: User | Company) {
  switch (userOrCompany.$type) {
    case 'USER':
      return [userOrCompany.firstname, userOrCompany.lastname].join(' ')
    case 'COMPANY':
      return userOrCompany.name
  }
}

function cuteGetName(userOrCompany: User | Company) {
  return Switch(userOrCompany).on('$type')
    .match('USER', user => [user.firstname, user.lastname].join(' '))
    .match('COMPANY', company => company.name)
    .orThrow()
}
```
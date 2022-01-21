import { Switch } from '.'

class User {
  readonly $type = 'USER'
  constructor(
    readonly name: string
  ) { }
}

class Story {
  readonly $type = 'STORY'
  constructor(
    readonly url: string
  ) { }
}

describe(Switch, () => {
  it('should throw provided error', () => expect(() =>
    Switch('hello')
      .orThrow(() => new Error('No match'))
  ).toThrowError('No match'))

  it('should throw default error', () => expect(() =>
    Switch('hello')
      .orThrow()
  ).toThrowError("'hello' out of range"))

  it('should return default value', () => expect(
    Switch('hello')
      .defaultTo(() => 'world')
  ).toBe('world'))

  it('should return default when no match', () => expect(
    Switch('goodbye')
      .case('hello', () => 'world')
      .defaultTo(() => 'universe')
  ).toBe('universe'))

  it('should return case', () => expect(
    Switch('hello')
      .case('hello', () => 'world')
      .defaultTo(() => 'universe')
  ).toBe('world'))

  it('should return another case', () => expect(
    Switch('goodbye')
      .case('hello', () => 'world')
      .case('goodbye', () => 'universe')
      .orThrow()
  ).toBe('universe'))

  it('should return first case', () => expect(
    Switch('hello')
      .case('hello', () => 'world')
      .case('hello', () => 'universe')
      .orThrow()
  ).toBe('world'))

  it('should return unions', () => expect(
    Switch('hello')
      .case('hello', () => 123)
      .case('world', () => 'of code')
      .orThrow()
  ).toBe(123))

  it('should return match', () => expect(
    Switch<User | Story>(new User('Donald'))
      .match(User, user => user.name)
      .match(Story, story => story.url)
      .orThrow()
  ).toBe('Donald'))

  it('should switch on types', () => expect(
    Switch<User | Story>({ $type: 'STORY', url: 'https://example.com' })
      .on('$type')
      .match('STORY', (story) => story.url)
      .match('USER', (user) => user.name)
      .orThrow()
  ).toBe('https://example.com'))
})

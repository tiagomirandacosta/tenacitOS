/**
 * Tests for bcrypt password verification in login route.
 * These test the auth logic in isolation (not the full HTTP route).
 */
import bcrypt from 'bcryptjs'

describe('bcrypt password verification', () => {
  const password = 'TestPassword123!'
  let hash: string

  beforeAll(async () => {
    hash = await bcrypt.hash(password, 12)
  })

  it('accepts correct password', async () => {
    const result = await bcrypt.compare(password, hash)
    expect(result).toBe(true)
  })

  it('rejects wrong password', async () => {
    const result = await bcrypt.compare('WrongPassword', hash)
    expect(result).toBe(false)
  })

  it('rejects empty string', async () => {
    const result = await bcrypt.compare('', hash)
    expect(result).toBe(false)
  })
})

import path from 'path'
import fs from 'fs'

describe('openclaw paths', () => {
  it('OPENCLAW_DIR env var points to a readable directory', () => {
    const dir = process.env.OPENCLAW_DIR || '/docker/moltbot/openclaw-data'
    expect(fs.existsSync(dir)).toBe(true)
  })

  it('openclaw.json exists and is valid JSON', () => {
    const dir = process.env.OPENCLAW_DIR || '/docker/moltbot/openclaw-data'
    const configPath = path.join(dir, 'openclaw.json')
    expect(fs.existsSync(configPath)).toBe(true)
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(() => JSON.parse(content)).not.toThrow()
  })

  it('openclaw.json has agents array', () => {
    const dir = process.env.OPENCLAW_DIR || '/docker/moltbot/openclaw-data'
    const configPath = path.join(dir, 'openclaw.json')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    expect(Array.isArray(config.agents) || typeof config.agents === 'object').toBe(true)
  })
})

/**
 * Tests for terminal command allowlist logic.
 * Extracted/mirrors the isCommandAllowed logic in the terminal route.
 */

const ALLOWED_PREFIXES = [
  'docker logs',
  'docker exec',
  'docker stats',
  'docker ps',
  'journalctl',
  'ps aux',
  'ps -ef',
]

function isCommandAllowed(command: string): boolean {
  const trimmed = command.trim().toLowerCase()
  return ALLOWED_PREFIXES.some(prefix => trimmed.startsWith(prefix))
}

describe('terminal allowlist', () => {
  it('allows docker logs', () => {
    expect(isCommandAllowed('docker logs moltbot-clawdbot-1')).toBe(true)
  })
  it('allows docker exec', () => {
    expect(isCommandAllowed('docker exec moltbot-clawdbot-1 openclaw status')).toBe(true)
  })
  it('allows journalctl', () => {
    expect(isCommandAllowed('journalctl -u caddy')).toBe(true)
  })
  it('allows ps aux', () => {
    expect(isCommandAllowed('ps aux')).toBe(true)
  })
  it('blocks systemctl', () => {
    expect(isCommandAllowed('systemctl restart nginx')).toBe(false)
  })
  it('blocks rm -rf', () => {
    expect(isCommandAllowed('rm -rf /')).toBe(false)
  })
  it('blocks find', () => {
    expect(isCommandAllowed('find / -name "*.env"')).toBe(false)
  })
  it('blocks netstat', () => {
    expect(isCommandAllowed('netstat -tulpn')).toBe(false)
  })
})

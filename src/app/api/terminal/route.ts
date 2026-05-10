/**
 * Secure Browser Terminal API
 * POST /api/terminal
 * Body: { command }
 *
 * Security: strict prefix-based allowlist
 * Only allows docker, journalctl, and ps commands
 */
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const command = (body.command || '').trim();

    if (!command) {
      return NextResponse.json({ error: 'No command provided' }, { status: 400 });
    }

    if (!isCommandAllowed(command)) {
      return NextResponse.json({
        error: `Command not allowed: "${command}"`,
        hint: 'Only docker (logs/exec/stats/ps), journalctl, and ps commands are permitted.',
      }, { status: 403 });
    }

    const start = Date.now();
    const { stdout, stderr } = await execAsync(command, { timeout: 10000, maxBuffer: 1024 * 1024 });
    const duration = Date.now() - start;

    return NextResponse.json({
      output: stdout + (stderr ? `\nSTDERR: ${stderr}` : ''),
      duration,
      command,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, output: msg }, { status: 200 }); // Return 200 with error in output
  }
}

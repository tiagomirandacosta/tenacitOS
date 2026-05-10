import path from 'path';

/**
 * Centralized path configuration.
 * In production (VPS), OPENCLAW_DIR=/docker/moltbot/openclaw-data (host filesystem).
 * Agent workspaces in openclaw.json use Docker-internal paths (/home/node/clawd/...).
 * Skills live inside Docker at /home/node/clawd/skills/ — access via docker exec.
 * For local development, override via environment variables.
 */
export const OPENCLAW_DIR = process.env.OPENCLAW_DIR || '/root/.openclaw';
export const OPENCLAW_WORKSPACE = process.env.OPENCLAW_WORKSPACE || path.join(OPENCLAW_DIR, 'workspace');
export const OPENCLAW_CONFIG = path.join(OPENCLAW_DIR, 'openclaw.json');
export const OPENCLAW_MEDIA = path.join(OPENCLAW_DIR, 'media');

export const WORKSPACE_IDENTITY = path.join(OPENCLAW_WORKSPACE, 'IDENTITY.md');
export const WORKSPACE_TOOLS = path.join(OPENCLAW_WORKSPACE, 'TOOLS.md');
export const WORKSPACE_MEMORY = path.join(OPENCLAW_WORKSPACE, 'memory');

/**
 * Docker container name for exec-based operations (skills, etc.)
 * Skills live inside the container at DOCKER_SKILLS_PATH.
 */
export const DOCKER_CONTAINER = process.env.DOCKER_CONTAINER || 'moltbot-clawdbot-1';
export const DOCKER_SKILLS_PATH = process.env.OPENCLAW_SKILLS_PATH || '/home/node/clawd/skills';

/**
 * Host-side paths (set to empty string to disable if they don't exist in this deployment).
 * DEFAULT_SYSTEM_PATH: npm-installed openclaw package skills (may not exist on host).
 * WORKSPACE_SKILLS_PATH: workspace-infra skills dir (may not exist in Docker deployments).
 * skill-parser.ts handles missing paths gracefully with existsSync checks.
 */
export const SYSTEM_SKILLS_PATH = process.env.SYSTEM_SKILLS_PATH || '/usr/lib/node_modules/openclaw/skills';
export const WORKSPACE_SKILLS_PATH = process.env.WORKSPACE_SKILLS_PATH || path.join(OPENCLAW_DIR, 'workspace-infra', 'skills');

/** Allowed base paths for media/file serving */
export const ALLOWED_MEDIA_PREFIXES = [
  path.join(OPENCLAW_WORKSPACE, '/'),
  path.join(OPENCLAW_MEDIA, '/'),
];

import fs from 'fs';
import path from 'path';
import { User, UserWithoutPassword } from '@/lib/auth';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

function ensureDataDir(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readUsers(): User[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as User[];
}

function writeUsers(users: User[]): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find((u) => u.email === email);
}

export function findUserById(id: string): User | undefined {
  const users = readUsers();
  return users.find((u) => u.id === id);
}

export function createUser(user: User): void {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
}

export function stripPassword(user: User): UserWithoutPassword {
  const { password, ...rest } = user;
  return rest;
}

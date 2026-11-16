import "server-only";
import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import type { ScanResult } from "./detector/types";

/**
 * libSQL: a local SQLite file in development, or a hosted Turso database in
 * production by setting DATABASE_URL (libsql://…) and DATABASE_AUTH_TOKEN.
 */
const url = process.env.DATABASE_URL || "file:./data/app.db";

const globalForDb = globalThis as unknown as { __db?: Promise<Client> };

async function init(): Promise<Client> {
  if (url.startsWith("file:./data/")) mkdirSync("./data", { recursive: true });
  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS scans (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        source TEXT NOT NULL,
        score INTEGER NOT NULL,
        band TEXT NOT NULL,
        word_count INTEGER NOT NULL,
        engine TEXT NOT NULL,
        result TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS scans_user_created ON scans(user_id, created_at DESC)`,
    ],
    "write",
  );
  return client;
}

function db(): Promise<Client> {
  return (globalForDb.__db ??= init());
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ScanSummary {
  id: string;
  title: string;
  source: string;
  score: number;
  band: ScanResult["band"];
  wordCount: number;
  engine: ScanResult["engine"];
  createdAt: string;
}

export interface ScanRecord extends ScanSummary {
  result: ScanResult;
}

export async function findUserByEmail(email: string) {
  const res = await (await db()).execute({
    sql: "SELECT id, email, name, password_hash FROM users WHERE email = ?",
    args: [email],
  });
  const row = res.rows[0];
  if (!row) return null;
  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    passwordHash: String(row.password_hash),
  };
}

export async function findUserById(id: string): Promise<User | null> {
  const res = await (await db()).execute({
    sql: "SELECT id, email, name FROM users WHERE id = ?",
    args: [id],
  });
  const row = res.rows[0];
  return row ? { id: String(row.id), email: String(row.email), name: String(row.name) } : null;
}

export async function createUser(email: string, name: string, passwordHash: string): Promise<User> {
  const id = crypto.randomUUID();
  await (await db()).execute({
    sql: "INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
    args: [id, email, name, passwordHash, new Date().toISOString()],
  });
  return { id, email, name };
}

export async function saveScan(
  userId: string,
  title: string,
  source: string,
  result: ScanResult,
): Promise<string> {
  const id = crypto.randomUUID();
  await (await db()).execute({
    sql: `INSERT INTO scans (id, user_id, title, source, score, band, word_count, engine, result, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id, userId, title, source, result.score, result.band, result.wordCount,
      result.engine, JSON.stringify(result), new Date().toISOString(),
    ],
  });
  return id;
}

type Row = Record<string, unknown>;
const toSummary = (row: Row): ScanSummary => ({
  id: String(row.id),
  title: String(row.title),
  source: String(row.source),
  score: Number(row.score),
  band: String(row.band) as ScanSummary["band"],
  wordCount: Number(row.word_count),
  engine: String(row.engine) as ScanSummary["engine"],
  createdAt: String(row.created_at),
});

export async function listScans(userId: string): Promise<ScanSummary[]> {
  const res = await (await db()).execute({
    sql: `SELECT id, title, source, score, band, word_count, engine, created_at
          FROM scans WHERE user_id = ? ORDER BY created_at DESC LIMIT 200`,
    args: [userId],
  });
  return res.rows.map((r) => toSummary(r as Row));
}

/** Scoped to the owner: another user's id simply returns null. */
export async function getScan(userId: string, id: string): Promise<ScanRecord | null> {
  const res = await (await db()).execute({
    sql: "SELECT * FROM scans WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  const row = res.rows[0] as Row | undefined;
  if (!row) return null;
  return { ...toSummary(row), result: JSON.parse(String(row.result)) as ScanResult };
}

export async function deleteScan(userId: string, id: string): Promise<boolean> {
  const res = await (await db()).execute({
    sql: "DELETE FROM scans WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  return res.rowsAffected > 0;
}

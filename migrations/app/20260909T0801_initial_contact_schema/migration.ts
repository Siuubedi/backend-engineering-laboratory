#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/b57407932c8b20bbe3567f31b77310c9438665e5e33773e3e7675b7e3cb67a38/contract';
import endContract from '../../snapshots/b57407932c8b20bbe3567f31b77310c9438665e5e33773e3e7675b7e3cb67a38/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'contact',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('displayName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('normalizedDisplayName', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'contactEmail',
        columns: [
          col('contactId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('normalizedEmail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'contactPhone',
        columns: [
          col('contactId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('normalizedPhone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('normalizedEmail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('normalizedPhone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'contact',
        constraint: 'contact_userId_normalizedDisplayName_key',
        columns: ['userId', 'normalizedDisplayName'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'contact',
        constraint: 'contact_id_userId_key',
        columns: ['id', 'userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'contactEmail',
        constraint: 'contactEmail_userId_normalizedEmail_key',
        columns: ['userId', 'normalizedEmail'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'contactPhone',
        constraint: 'contactPhone_userId_normalizedPhone_key',
        columns: ['userId', 'normalizedPhone'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_normalizedEmail_key',
        columns: ['normalizedEmail'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_normalizedPhone_key',
        columns: ['normalizedPhone'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'contact',
        index: 'contact_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'contactEmail',
        index: 'contactEmail_contactId_userId_idx_8218c639',
        columns: ['contactId', 'userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'contactPhone',
        index: 'contactPhone_contactId_userId_idx_8218c639',
        columns: ['contactId', 'userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'contact',
        foreignKey: {
          name: 'contact_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'contactEmail',
        foreignKey: {
          name: 'contactEmail_contactId_userId_fkey',
          columns: ['contactId', 'userId'],
          references: { schema: 'public', table: 'contact', columns: ['id', 'userId'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'contactPhone',
        foreignKey: {
          name: 'contactPhone_contactId_userId_fkey',
          columns: ['contactId', 'userId'],
          references: { schema: 'public', table: 'contact', columns: ['id', 'userId'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

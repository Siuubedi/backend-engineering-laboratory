#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3d3c075c3f11564378f69b52478b5e87891eeb7d46513ad361a2f723b0cbca33/contract';
import endContract from '../../snapshots/3d3c075c3f11564378f69b52478b5e87891eeb7d46513ad361a2f723b0cbca33/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b57407932c8b20bbe3567f31b77310c9438665e5e33773e3e7675b7e3cb67a38/contract';
import startContract from '../../snapshots/b57407932c8b20bbe3567f31b77310c9438665e5e33773e3e7675b7e3cb67a38/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'user', column: 'passwordHash' }),
      this.createTable({
        schema: 'public',
        table: 'oAuthAccount',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('provider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerAccountId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'passwordCredential',
        columns: [
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['userId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pendingRegistration',
        columns: [
          col('attemptCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('normalizedEmail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('verificationCodeHash', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'oAuthAccount',
        constraint: 'oAuthAccount_provider_providerAccountId_key',
        columns: ['provider', 'providerAccountId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'oAuthAccount',
        constraint: 'oAuthAccount_userId_provider_key',
        columns: ['userId', 'provider'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pendingRegistration',
        constraint: 'pendingRegistration_normalizedEmail_key',
        columns: ['normalizedEmail'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'oAuthAccount',
        index: 'oAuthAccount_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'oAuthAccount',
        foreignKey: {
          name: 'oAuthAccount_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'passwordCredential',
        foreignKey: {
          name: 'passwordCredential_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

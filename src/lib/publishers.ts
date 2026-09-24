/**
 * Data-access helpers for querying game publishers from the local SQLite database.
 * These helpers are kept injectable and deterministic so they can be reused in
 * Astro page frontmatter and Vitest database fixtures.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher as a summary object containing its id and name.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A list of publishers ordered alphabetically by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}

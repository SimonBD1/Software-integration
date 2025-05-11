import sourceDb from './db/source.js';
import targetDb from './db/target.js';

async function migrateUsers() {
  try {
    // 1) Pull only the columns you need:
    const users = await sourceDb
      .select('id', 'username', 'email')
      .from('users');

    if (users.length === 0) {
      console.log('No users to migrate.');
      return;
    }

    // 2) Do a batch upsert inside a transaction:
    await targetDb.transaction(async trx => {
      await trx('users')
        .insert(users)
        .onConflict('id')
        .merge();
    });

    console.log(`Migrated ${users.length} users successfully.`);
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    // tear down both connections
    await sourceDb.destroy();
    await targetDb.destroy();
  }
}

migrateUsers();
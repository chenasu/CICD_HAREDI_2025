// import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

// dotenv.config();

class DB {
  constructor() {
    // Create a connection pool using the connection string from .env
    this.pool = new Pool({
      ssl: true,
      connectionString:
        'postgresql://main_db_rv6u_user:G6d6B0jaLKp02RQCzq4UK5gTWSLbtF05@dpg-cvp70gje5dus73cblfbg-a.frankfurt-postgres.render.com/main_db_rv6u'
      //   connectionString: process.env.DATABASE_URL,
    });
    this.initDB();
  }

  /**
   * Ensures the "users" table exists with columns: id, username, password
   */
  async initDB() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `;

    try {
      await this.pool.query(createTableQuery);
      console.log("Successfully ensured 'users' table exists.");
    } catch (err) {
      throw new Error(`Could not initialize DB: ${err.message}`);
    }
  }

  /**
   * Accepts a raw SQL query string and executes it as a migration.
   * E.g. CREATE TABLE ...; or ALTER TABLE ...
   */
  async runMigration(migrationQuery) {
    try {
      await this.pool.query(migrationQuery);
      console.log('Migration applied successfully:', migrationQuery);
    } catch (err) {
      throw new Error(`Migration failed: ${err.message}`);
    }
  }

  /**
   * Accepts an array of migration queries and runs each in sequence.
   */
  async applyMigrations(migrations = []) {
    for (const migrationQuery of migrations) {
      await this.runMigration(migrationQuery);
    }
  }

  /**
   * Example method for adding a user (optional).
   * @param {string} username
   * @param {string} password
   */
  async addUser(username, password) {
    const insertQuery = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username
    `;
    try {
      const { rows } = await this.pool.query(insertQuery, [username, password]);
      // Return the newly created user (minus the password)
      return rows[0];
    } catch (err) {
      throw new Error(`Could not add user: ${err.message}`);
    }
  }

  /**
   * Example method for retrieving all users (optional).
   */
  async getUsers() {
    const selectQuery = `
      SELECT id, username FROM users
    `;
    try {
      const { rows } = await this.pool.query(selectQuery);
      return rows;
    } catch (err) {
      throw new Error(`Could not retrieve users: ${err.message}`);
    }
  }

  /**
   * Return a single user by email (username field).
   * @param {string} email - The user's email address.
   * @returns {Promise<{id: number, username: string, password: string} | null>}
   */
  async getUserByEmail(email) {
    const query = `
      SELECT id, username, password
      FROM users
      WHERE username = $1
    `;
    try {
      const { rows } = await this.pool.query(query, [email]);
      if (rows.length === 0) {
        return null; // No user found
      }
      return rows[0]; // Return the user object
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  /**
   * Graceful shutdown of the connection pool
   */
  async close() {
    await this.pool.end();
    console.log('Database pool closed.');
  }
}

// Export a single instance for app-wide usage
export default new DB();

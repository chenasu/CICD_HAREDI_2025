import db from "../data-access/db.js";

async function checkLogin(userName, password) {
  if (!userName.includes('@')) {
    throw new Error('Invalid user name');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 chars');
  }
  const existingUser = await db.getUserByEmail(userName);
  console.log('existingUser', existingUser);
  if (!existingUser){
    throw new Error("User not exist");
  }
  if (password == existingUser.password){
    return existingUser;
  }
  throw new Error("Invalid password");
}


/**
 * Checks if userName and password are valid, then inserts user into DB.
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<{id: number, username: string}>} The newly created user record.
 */
export async function addNewUser(userName, password) {
    // Basic validations
    if (!userName.includes('@')) {
      throw new Error('Invalid user name');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 chars');
    }
  
    // (Optional) Check if user already exists
    const existingUser = await db.getUserByEmail(userName);
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    // Insert the new user
    const newUser = await db.addUser(userName, password);
    return newUser;
  }

export {
    checkLogin
}
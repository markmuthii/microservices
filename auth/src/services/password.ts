import * as bcrypt from "bcrypt";

/**
 * Password class to handle the hashing and comparison of passwords
 */
export class Password {
  private static salt: string = bcrypt.genSaltSync(10);

  /**
   *
   * @param pass the password to be hashed
   * @returns hashed password
   */
  static toHash(pass: string): string {
    return bcrypt.hashSync(pass, this.salt);
  }

  /**
   *
   * @param pass the user-supplied password that is being checked
   * @param storedHash the stored hash that the pass is to be checked against
   * @returns boolean
   */
  static compare(pass: string, storedHash: string): boolean {
    return bcrypt.compareSync(pass, storedHash);
  }
}

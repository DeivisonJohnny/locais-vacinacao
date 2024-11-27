export default class TokenManager {
  private static TOKEN_KEY = "token";

  static set(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static remove() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

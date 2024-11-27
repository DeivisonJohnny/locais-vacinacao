export default class TokenManager {
  private static TOKEN_KEY = "token";

  static set(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  static get(): string | null {
    if (typeof window !== "undefined") {
      // Verifica se o código está sendo executado no navegador
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null; // Retorna null se estiver no lado do servidor
  }
  static remove() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

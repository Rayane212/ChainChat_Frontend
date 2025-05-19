export class ApiClient {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    private async request(endpoint: string, method: string, body?: any) {
      const token = localStorage.getItem("jwt");
      console.log("JWT Token:", token); // Debugging pour voir si le token est bien récupéré

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
    
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // Timeout de 5 sec pour éviter les requêtes bloquées
    
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal, // Ajout d'un signal d'annulation
        });
    
        clearTimeout(timeout);
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur API");
        }
    
        return await response.json();
      } catch (error) {
        
        if (error instanceof Error ) {
          if (error.name === "AbortError"){
            console.error("API request aborted due to timeout");
          }
          else {
            console.error(`Erreur sur ${method} ${endpoint} :`, error.message);
          }
        } 
        throw error;
      }
    }
    
  
    async login(email: string, password: string) {
      const response = await this.request("/auth/login", "POST", { email, password });
      localStorage.setItem("jwt", response.result.token);
      return response;
    }
  
    async register(data:any) {
      const response = await this.request("/auth/register", "POST", { data });
      localStorage.setItem("jwt", response.result.token);
      return response;
    }
  
    async getUserProfile() {
       const user = await this.request("/auth/me", "GET");
       console.log(user);
       return user;
    }
  
    async logout() {
      localStorage.removeItem("jwt");
    }
  }
  
  export const api = new ApiClient("http://localhost:3000/api");
  
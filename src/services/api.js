/**
 * CrimeTraceAI — Spring Boot REST API Client & Service Abstraction
 * 
 * Configured via import.meta.env.VITE_API_BASE_URL.
 * When a live Spring Boot backend is unavailable, requests seamlessly fallback
 * to localStorage-backed operational persistence so investigators can perform full
 * CRUD and testing without interruption.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    const token = localStorage.getItem('crimetrace_auth_token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Jurisdiction': 'IN-CYBERCELL',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this.getHeaders(), ...options.headers };

    try {
      // Short timeout to avoid hanging if backend is not running
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch {
      // Backend not running / connection refused -> fallback to client-side storage
      return null;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);
export { API_BASE_URL };

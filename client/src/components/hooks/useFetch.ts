const token = sessionStorage.getItem("token");
const baseUrl = import.meta.env.VITE_API_URL || "";
const useFetch = () => {


    const request = async (url: string, method: string, options: RequestInit) => {
      const isFormData = options.body instanceof FormData;
      
      const res = await fetch(`${baseUrl}/${url}`, {
        method,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          "Authorization": `Bearer ${token}`,
          ...options.headers
        },
        body: method !== "GET" ? options.body : undefined,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    };

  return { get: (url: string, options: RequestInit = {}) => request(url, "GET", options),
            post: (url: string, options: RequestInit) => request(url, "POST", options),
            put: (url: string, options: RequestInit) => request(url, "PUT", options),
            delete: (url: string, options: RequestInit) => request(url, "DELETE", options)
   }
  
};

export default useFetch;

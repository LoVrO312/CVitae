const baseUrl = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Incorrect credentials");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

const register = async (email: string, password: string, confirmPassword: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, confirmPassword })
        });

        if (!response.ok) {
            throw new Error("Failed to register user");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

const verifyToken = async (token: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/verify-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export { login, register, verifyToken };
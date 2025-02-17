const baseUrl = import.meta.env.VITE_API_URL;

const getResumeInfo = async () => {
    try {
        const token = localStorage.getItem("token");

        
        const response = await fetch(`${baseUrl}/user/get-resume-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve resume info");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export { getResumeInfo };

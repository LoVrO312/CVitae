const baseUrl = import.meta.env.VITE_API_URL;

const uploadFile = async (file: File, fileName: string) => {
    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        const response = await fetch(`${baseUrl}/file/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

const getFile = async (fileName: string) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${baseUrl}/file/${fileName}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve file");
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export { uploadFile, getFile };

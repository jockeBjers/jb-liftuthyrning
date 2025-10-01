export function apiUtil() {

    const getFetch = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error");
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }

    const postFetch = async (url: string, payload: any) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Error");
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const putFetch = async (url: string, payload: any) => {
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Error");
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    const deleteFetch = async (url: string) => {
        try {
            const response = await fetch(url, { method: "DELETE" });
            if (!response.ok) throw new Error("Error");
            return true;
        }
        catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }   
    };

    return {getFetch, postFetch, putFetch, deleteFetch };
}
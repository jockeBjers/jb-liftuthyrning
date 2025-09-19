export function useFetchApi() {

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

    return { postFetch};
}
export async function getNews() {
    try {
        const res = await fetch(
            "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=88b730d907f14b1cad1eb4f6f1f38d56"
        );

        const data = await res.json();

        return data.articles; // important
    } catch (error) {
        console.log(error);
        return [];
    }
}
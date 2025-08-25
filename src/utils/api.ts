export const API_URL = "http://127.0.0.1:8000";
// export const API_URL = "https://sca-backend-ppcc7qcg3-semagrs-projects.vercel.app";

export type Cat = {
    id: number;
    name: string;
    years_of_experience: number;
    breed: string;
    salary: number;
};

export type CatCreate = {
    name: string;
    years_of_experience: number;
    breed: string;
    salary: number;
};

export async function getCats() {
    const res = await fetch(`${API_URL}/cats/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch cats");
    return res.json();
}

export async function createCat(cat: CatCreate) {
    const res = await fetch(`${API_URL}/cats/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cat),
    });
    if (!res.ok) throw new Error("Failed to create cat");
    return res.json();
}

export async function updateCatSalary(catId: number, salary: number) {
    const res = await fetch(`${API_URL}/cats/${catId}/salary`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salary }),
    });
    if (!res.ok) throw new Error("Failed to update cat salary");
    return res.json();
}

export async function deleteCat(catId: number) {
    const res = await fetch(`${API_URL}/cats/${catId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete cat");
}

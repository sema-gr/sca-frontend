import { useState } from "react";
import { CatCreate, createCat } from "@/utils/api";
import styles from "./CatForm.module.css";

type Props = {
    onCatCreated: () => void;
};

export default function CatForm({ onCatCreated }: Props) {
    const [name, setName] = useState("");
    const [years, setYears] = useState("");
    const [breed, setBreed] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newCat: CatCreate = {
                name,
                years_of_experience: Number(years),
                breed,
                salary: Number(salary),
            };
            await createCat(newCat);
            setName(""); setYears(""); setBreed(""); setSalary("");
            onCatCreated();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Years of Experience" value={years} onChange={e => setYears(e.target.value)} />
            <input placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} />
            <input placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
            <button type="submit">Add Cat</button>
        </form>
    );
}

import { useEffect, useState } from "react";
import { getCats, Cat } from "../utils/api";
import CatForm from "@/compenents/catForm/CatForm";
import CatList from "@/compenents/catList/CatList";
import styles from "./index.module.css";

export default function Home() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [error, setError] = useState("");

    const loadCats = async () => {
        try {
            const data = await getCats();
            setCats(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    };

    useEffect(() => {
        loadCats();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Spy Cats Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}
            <CatForm onCatCreated={loadCats} />
            <CatList cats={cats} onUpdate={loadCats} onDelete={loadCats} />
        </div>
    );
}

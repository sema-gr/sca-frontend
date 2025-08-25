import { useState } from "react";
import { Cat, updateCatSalary, deleteCat } from "@/utils/api";
import styles from "./CatList.module.css";

type Props = {
    cats: Cat[];
    onUpdate: () => void;
    onDelete: () => void;
};

export default function CatList({ cats, onUpdate, onDelete }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [salary, setSalary] = useState("");

    const handleUpdate = async (catId: number) => {
        try {
            await updateCatSalary(catId, Number(salary));
            setEditingId(null);
            setSalary("");
            onUpdate();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    };

    return (
        <div className={styles.listContainer}>
            {cats.map(cat => (
                <div key={cat.id} className={styles.catCard}>
                    <span className={styles.catInfo}>
                        {cat.name} ({cat.years_of_experience} yrs) - {cat.breed} - ${cat.salary}
                    </span>
                    <div className={styles.buttonGroup}>
                        {editingId === cat.id ? (
                            <>
                                <input value={salary} onChange={e => setSalary(e.target.value)} />
                                <button className="save" onClick={() => handleUpdate(cat.id)}>Save</button>
                            </>
                        ) : (
                            <button className="edit" onClick={() => { setEditingId(cat.id); setSalary(String(cat.salary)); }}>Edit</button>
                        )}
                        <button className="delete" onClick={async () => { await deleteCat(cat.id); onDelete(); }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

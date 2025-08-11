

export const getPatients = async () => {
    try {
        const res = await fetch("http://localhost:3002/patients", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!res.ok) throw new Error("Erreur API");

        return await res.json({message: "Succès de lecture"});

    } catch (error) {
        console.log("Erreur lors du fetch:", error)
    }
}

// Ajouter
export const postPatient = async (patient) => {
    const res = await fetch("http://localhost:3002/patient/ajouter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient)
    });

    console.log("Voici ce que j'envoie au back:", patient)
    const data = await res.json();
    alert(data.message);
}

// SUPPRIMER
export const deletePatient = async (id) => {
    const res = await fetch(`http://localhost:3002/patient/supprimer/${id}`, { method: "DELETE" });
    if(!res.ok) throw new Error("Erreur de suppression du patient");

    const data = await res.json();
}

// MODIFIER
export const updatePatient = async(id, data) => {
    const res = await fetch(`http://localhost:3002/patient/modifier/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(!res.ok) throw new Error('Erreur de modification du patient');

}

// RECUPERER UN
export const getPatient = async(id) => {
    try {
        const res = await fetch(`http://localhost:3002/patient/${id}`);
        return await res.json();

    } catch (error) {
        console.log(error);
        alert(error)
    }
}
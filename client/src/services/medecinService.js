
export const getMedecins = async () => {
    try {
        const res = await fetch("http://localhost:3002/medecins", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            credentials: 'include'
        });
        if (!res.ok) throw new Error("Erreur API");
        return await res.json();

    } catch (error) {
        console.log("Erreur lors du fetch:", error);
        return error;
    }
}

// Ajouter
export const postMedecin = async (medecin) => {
    const res = await fetch("http://localhost:3002/medecin/ajouter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medecin)
    });

    console.log("Voici ce que j'envoie au back:", medecin)
    const data = await res.json();
    alert(data.message);
}

// SUPPRIMER
export const deleteMedecin = async (id) => {
    try {
        const res = await fetch(`http://localhost:3002/medecin/supprimer/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erreur de suppression du medecin");

        return await res.json();
        
    } catch (error) {
        console.log(error);
        return error
    }
}

// MODIFIER
export const updateMedecin = async (id, data) => {
    const res = await fetch(`http://localhost:3002/medecin/modifier/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Erreur de modification du medecin');

}

// RECUPERER UN
export const getMedecin = async (id) => {
    try {
        const res = await fetch(`http://localhost:3002/medecin/${id}`);
        return await res.json();

    } catch (error) {
        console.log(error);
        alert(error)
    }
}
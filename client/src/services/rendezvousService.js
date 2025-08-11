
// Liste
export const getRendezvouss = async () => {
    try {
        const res = await fetch("http://localhost:3002/rendezvouss", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!res.ok) throw new Error("Erreur API");

        return await res.json();

    } catch (error) {
        console.log("Erreur lors du fetch:", error)
        return error
    }
}

// Ajouter
export const postRendezvous = async (rendezvous) => {
    try {
        const res = await fetch("http://localhost:3002/rendezvous/ajouter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rendezvous)
        });

        if (!res.ok) throw new Error("Erreur service: impossible de sauvegarder le rendez-vous");

        const data = await res.json();
        console.log("Voici ce que j'envoie au back:", rendezvous)
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}

// SUPPRIMER
export const deleteRendezvous = async (id) => {
    try {
        const res = await fetch(`http://localhost:3002/rendezvous/supprimer/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erreur de suppression du rendezvous");

        return await res.json();

    } catch (error) {
        console.log(error);
        return error
    }
}

// MODIFIER
export const updateRendezvous = async (id, data) => {
    try {
        const res = await fetch(`http://localhost:3002/rendezvous/modifier/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur de modification du rendezvous');

        return res.json();
        
    } catch (error) {
        console.log(error);
        return error
    }
}

// RECUPERER UN
export const getRendezvous = async (id) => {
    try {
        const res = await fetch(`http://localhost:3002/rendezvous/${id}`);
        return await res.json();

    } catch (error) {
        console.log(error);
        return error;
    }
}
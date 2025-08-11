
// Connexion
export const adminLogin = async(data)=> {
    try {
        const res = await fetch('http://localhost:3002/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if(!res.ok) throw new Error("La requête a echouée");
        
        return await res.json();

    } catch (error) {
        return error;
    }
}

// Inscription
export const adminSignup = async(data)=> {
    try {
        const res = await fetch('http://localhost:3002/admin/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!res.ok) throw new Error("Erreur d'inscription admin");
        
        return await res.json();

    } catch (error) {;
        console.log(error);
        return error;
    }
}
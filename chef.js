// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). 
// Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch



async function getChefBirthday(id) {
    let ricetta;
    try {
        const resricetta = await fetch(`https://dummyjson.com/recipes/${id}`);
        ricetta = await resricetta.json()
    } catch (error) {
        console.log(error);
        throw new Error(`Non recupero la ricetta ${id}`)
    }
    if (!ricetta) {
        throw new Error(`Non ho trovato la ricetta ${id}`)
    }

    let chef;
    try {
        const reschef = await fetch(`https://dummyjson.com/users/${ricetta.userId}`);
        chef = await reschef.json()
    } catch (error) {
        console.log(error);
        throw new Error(`Non recupero lo chef ${id}`)
    }
    if (!chef) {
        throw new Error(`Non ho trovato lo chef ${id}`)
    }

    return chef.birthDate;
}

(async () => {
    try {
        const birthday = await getChefBirthday(1);
        console.log(`compleanno: ${birthday}`);

    } catch (error) {
        console.error(error);

    } finally {
        console.log('fine');

    }
})();
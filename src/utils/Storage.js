
/**
 * Objeto para trabajar con local storage
 */
const LocalStorage = {
    /**
     * Salvar sesión en local storage
     */
    saveLocalStorage: (session) => {
        localStorage.setItem('TheMovieDB_Session', JSON.stringify(session));
    },
    /**
     * Recuperar sesión del local storage
     */
    readLocalStorage: () => {
        const session = localStorage.getItem('TheMovieDB_Session');
        return JSON.parse(session)
    },
    /**
     * Clean local storage
     */
    cleanLocalStorage: () => {
        localStorage.clear();
    }
}

/**
 * Retorno el objeto
 */
export default LocalStorage;
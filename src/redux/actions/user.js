export const authenticationUser = (user) => {

    return {
        type: "AUTH_USER",
        playload: user 
    }
}
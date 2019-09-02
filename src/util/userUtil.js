export function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user === null){
        window.location="/";
    }else {
        return user;
    }
}

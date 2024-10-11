

function BlokUser() {
    const check = localStorage.getItem('user');
    if (check) {
        return true
    }
    return false
}

export default BlokUser
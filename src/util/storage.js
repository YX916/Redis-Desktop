export default {
    set(key, value) {
        localStorage.setItem(key, JSON.parse(JSON.stringify(value)))
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}
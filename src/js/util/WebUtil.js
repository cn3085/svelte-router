export function makeQueryString(searchObject){
    return Object.entries(searchObject).map(entry => {
        let [key, value] = entry;
        value = value ?? '';
        return [key, value].join('=')
    }).join('&');
}
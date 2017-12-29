export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}


export function generateUUID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 22; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export function formatDate(timestamp) {
    var date = new Date(timestamp)
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

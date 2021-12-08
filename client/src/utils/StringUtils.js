const listToString = (list, param) => {
    return list.map(element => {
        return element[param];
    }).sort().join(", ");
}

export {listToString}
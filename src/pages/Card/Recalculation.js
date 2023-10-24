export const recalculation = (items, total) => {
    console.log('Recalculation')
    console.log(items)
    console.log(total)
    let baseArray = {}
    if(items) {
        console.log('items exist')
        baseArray = items.map( (item) => {
            return{
                name: item.name,
                coefficient: item.quantity/total
            }
        })
        return baseArray;
    } else {
        return {error: 'items not exist'}
    }

    console.log(baseArray)
    // return 'recalculation done'
}

export const makeNewCard = (oldCard, totalValue, coefficient) => {
    let newArray;
    if (Array.isArray(oldCard)) {
        console.log('oldCard exist')
        console.log(coefficient);
        console.log(oldCard)

        newArray = oldCard.map( (item, index) => {
            console.log(item.name)
            console.log(coefficient[index].coefficient);
            console.log(item)
            return {
                name: item.name,
                quantity: Math.round(totalValue*coefficient[index].coefficient),
                _id: item._id
            }
            
        })
    
    } else { newArray = {error: 'do not calc newArray'}}
    return newArray;
}
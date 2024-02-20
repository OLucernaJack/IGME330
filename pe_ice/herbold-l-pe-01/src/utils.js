export const getRandom = arry => {
    const random = Math.floor(Math.random() * arry.length);
    return arry[random];
}
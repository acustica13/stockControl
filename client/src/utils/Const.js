const fetchBase = "http://localhost:8080";

const treshHold = 30*24*60*60*1000;
const cookieExpire = () => { 
    const date = new Date();
    date.setTime(Date.now() + treshHold);
    return date;
}

export { fetchBase, cookieExpire }
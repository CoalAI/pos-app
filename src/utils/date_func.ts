const getCurrentTime = function (){
    return new Date().toLocaleTimeString();
}

const getCurrentDate = function (){
    const current = new Date()
return current.toLocaleDateString()
}

export {
    getCurrentDate, 
    getCurrentTime
}
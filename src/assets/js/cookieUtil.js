import Cookies from 'js-cookie'

function mSetCookie(key,value){
    Cookies.set(key,value)
}


function mGetCookie(key){
    return Cookies.get(key)
}

export {
    mSetCookie,
    mGetCookie
}

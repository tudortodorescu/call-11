
import { qs } from './utils/dom.utils.js'

document.qs = qs
document.saveElev = saveElev

window.qs = qs

async function checkLogin() {
    const token = sessionStorage.getItem( 'token' )

    if ( !token ) {
        window.location = "./login.html"
    }
    
    const url = `https://todorescu.com/call-11/api/?method=checkLogin&params[token]=${ token }`
    const fetchResponse = await fetch( url )
    const data = await fetchResponse.json()
    
    if ( !data.valid ) {
        window.location = "./login.html"
    }
}

checkLogin()

////

async function saveElev() {
    const modalCreateElev = qs( '#js_create_elev' )

    const nume = qs( '#nume', modalCreateElev ).value
    const prenume = qs( '#prenume', modalCreateElev ).value
    const clasa = qs( '#clasa', modalCreateElev ).value
    const anul = qs( '#anul', modalCreateElev ).value

    const request = {
        method: 'saveElev',
        data: {
            nume,
            prenume,
            clasa,
            anul,
        },
    }

    const formData = new FormData();

    formData.append('method', request.method);
    formData.append('data', JSON.stringify( request.data ) );

    console.log( request.data )

    const response = await fetch( 'https://todorescu.com/call-11/api/', {
        method: 'POST',
        body: JSON.stringify( request ),
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
    })

    console.log( 'response', response )
}
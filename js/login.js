import { qs } from './utils/dom.utils.js'

 const inputEmail =  qs("#email");
 const inputPassword =  qs("#password");
 const buttonSubmit = qs("#button");


 buttonSubmit.addEventListener("click", async function(){
    const emailValue = inputEmail.value;
    const passwordValue =  CryptoJS.MD5( inputPassword.value ).toString();

    const url = `https://todorescu.com/call-11/api/?method=login&params[email]=${ emailValue }&params[password]=${ passwordValue }`
    const fetchResponse = await fetch( url )
    const data = await fetchResponse.json()

    if ( data.token === '' ) {
        const loginNotification = qs( '.login-notification' )
        loginNotification.classList.remove( 'hide' )

        inputPassword.value = ''

        qs( '.delete', loginNotification ).addEventListener( 'click', function() {
            loginNotification.classList.add( 'hide' )
        })
    }
    else {
        sessionStorage.setItem( 'token', data.token )
        window.location = './dashboard.html'
    }
})

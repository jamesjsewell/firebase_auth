
function navbarRender (onSelect, loggedIn) {
  $('#navbar').html(`

    ${!loggedIn ? `<button id='login_btn'>login</button>` : ''}

    ${loggedIn ? `<button id='logout_btn'>logout</button>` : ''}
    
  
  `)

  $('#logout_btn').click((e) => {
    e.preventDefault()
    firebase.auth().signOut()
  })

  $('#login_btn').click((e) => {
    e.preventDefault()
    showLogin()
  })
}

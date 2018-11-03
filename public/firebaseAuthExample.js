var displayName = null
var email = null
var emailVerified = null
var photoURL = null
var uid = null
var phoneNumber = null
var providerData = null
var currentUser = null

function startAuth () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.uid) {
      // User is signed in.
      currentUser = user
      displayName = user.displayName
      email = user.email
      emailVerified = user.emailVerified
      photoURL = user.photoURL
      uid = user.uid
      phoneNumber = user.phoneNumber
      providerData = user.providerData

      // update the user in your own users collection
      // user.getIdToken().then(function (accessToken) {
      //   database.ref('users/' + uid).set({
      //     username: displayName,
      //     email: email,
      //     profileImg: photoURL
      //   })
      // })
    } else {
      currentUser = null

      // User is signed out.
    }
    pageRender()
  },

  function (error) {
    console.log(error)
  })
}

function showLogin () {
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('app_wrapper').style.display = 'none'
      }
    },
    signInFlow: 'popup',
    autoUpgradeAnonymousUsers: false,
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
      // {
      //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   scopes: [
      //     'https://www.googleapis.com/auth/plus.login'
      //   ],
      //   customParameters: {
      //     // Forces account selection even when one account
      //     // is available.
      //     prompt: 'select_account'
      //   }
      // }
    ]
    // Other config options...
  })
}

function pageRender () {
  navbarRender()
}

function navbarRender (onSelect, loggedIn) {
  $('#navbar').html(`

    ${!currentUser ? `<button id='login_btn'>login</button>` : ''}

    ${currentUser ? `<button id='logout_btn'>logout</button>` : ''}
    
  
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

$(document).ready(() => {
  ui = new firebaseui.auth.AuthUI(firebase.auth())
  startAuth()

  if (ui.isPendingRedirect()) {
    showLogin()
  }

  pageRender()

  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
})

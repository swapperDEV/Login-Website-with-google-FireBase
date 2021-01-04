const signInForm = document.querySelector('#sign-in-form');
const signedInContent = document.querySelector('#signed-in-content');
const signedOutContent = document.querySelector('#signed-out-content')
const signOutButton = document.querySelector('#sign-out-button');
const signInWithGoogleButton = document.querySelector('#sign-in-google');
const googleProvider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();
const section = document.querySelector('section')

function myFunction() {
    section.style.display = 'block'
}


const showSignedInContent = () => {
    signedOutContent.style.display = 'none';
    signedInContent.style.display = 'block';
}
const showSignInForm = () => {
    signedOutContent.style.display = 'block';
    signedInContent.style.display = 'none';
}




const handleAuthChanged = (user) => {
    if (user) {
        showSignedInContent();
    } else {
        showSignInForm();
    }
}

const showError = (error) => {
    const errorBox = document.querySelector('#error-box');
    errorBox.innerHTML = error;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 5000);
};

const showSuccess = (error) => {
    const successBox = document.querySelector('#success-box');
    successBox.innerHTML = error;
    successBox.style.display = 'block';

    setTimeout(() => {
        successBox.style.display = 'none';
    }, 5000);
};

const getUserEmailAndPassword = () => ({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value
  });

const createUserAccount = () => {
    const { email, password } = getUserEmailAndPassword();

    firebase.auth().createUserWithEmailAndPassword(email, password);
}

const handleErrorSignIn = (error) => {
    switch (error.code) {
        case 'auth/user-not-found':
            createUserAccount();
            break;
        case 'auth/wrong-password':
            showError('podałeś nieprawidłowe haslo')
            break;
        default: 
            showError('Coś poszło nie tak');
    }
}

const handleSubmitSignInForm = (event) => {
    const { email, password } = getUserEmailAndPassword();

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(handleErrorSignIn);

    event.preventDefault();
};


const signInWithGoogle = () => {
    firebase.auth().signInWithPopup(googleProvider);
}

const signOut = () => {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(handleAuthChanged);
signInForm.addEventListener('submit', handleSubmitSignInForm);
signOutButton.addEventListener('click', signOut())
signOutButton.addEventListener('click', function(){
    location.reload();
})

signInWithGoogleButton.addEventListener('click', signInWithGoogle)

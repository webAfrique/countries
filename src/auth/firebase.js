// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword }  from 'firebase/auth'
import { addDoc, getDocs, doc, deleteDoc, collection, query, where, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countries-app-c67b9.firebaseapp.com",
  projectId: "countries-app-c67b9",
  storageBucket: "countries-app-c67b9.appspot.com",
  messagingSenderId: "865907764916",
  appId: "1:865907764916:web:92dad7c92f1c0fbf68f1e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Get access to the project authentication
export const auth = getAuth(app)
// Get access to the project database
export const db = getFirestore(app)


export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export const loginWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}

export const getUser = async(uid) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs[0].data()
    return user
}

export const logout = () => {
    auth.signOut()
}

//function to add a country to the user's favourites
export const addFavouriteToDb = async(uid, country) => {
    await addDoc(collection(db, `users/${uid}/favourites`), {
        uid,
        country
    })
}

//function to retrieve the user's favourites from the database
export const getFavouritesFromDb = async(uid) => {
    const q = query(collection(db, `users/${uid}/favourites`))
    const querySnapshot = await getDocs(q)
    const favourites = querySnapshot.docs.map(doc => doc.data().country)
    return favourites
}

//function to remove a country from the user's favourites
export const removeFavouriteFromDb = async(uid, country) => {
   const q = query(collection(db, `users/${uid}/favourites`), where('country.name.common', '==', country.name.common))
    const querySnapshot = await getDocs(q)
    const docId = querySnapshot.docs[0].id
    await deleteDoc(doc(db, `users/${uid}/favourites/${docId}`))
}

//function to clear all the user's favourites
export const clearFavouritesFromDb = async(uid) => {
    const q = query(collection(db, `users/${uid}/favourites`))
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach(async(doc) => {
        await deleteDoc(doc.ref)
    })
}
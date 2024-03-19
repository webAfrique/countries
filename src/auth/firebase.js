// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword }  from 'firebase/auth'
import { addDoc, getDocs, collection, query, where, getFirestore } from 'firebase/firestore'
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
const auth = getAuth(app)
// Get access to the project database
const db = getFirestore(app)


const registerWithEmailAndPassword = async (name, email, password) => {
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

const loginWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        alert(error.message)
    }

}

const getUser = async(uid) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs[0].data()
    return user
}

const logout = () => {
    auth.signOut()
}

export { auth, db, registerWithEmailAndPassword, loginWithEmailAndPassword, getUser,logout }
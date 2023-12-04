import { initializeApp } from "firebase/app";
import { GithubAuthProvider,GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyXRoId2QlIxw9WPfuaW8Qb3S_DtiHUJY",
    authDomain: "lpe2023.firebaseapp.com",
    projectId: "lpe2023",
    storageBucket: "lpe2023.appspot.com",
    messagingSenderId: "958137111309",
    appId: "1:958137111309:web:b524765d5776f2fd22d644"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

//export default firebaseApp;

//const googleProvider = new GoogleAuthProvider();
const googleProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.email,
                authProvider: "github",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout,
};
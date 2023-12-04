import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getPostsFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'acontecimentos'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                endereco: doc.data().endereco,
                tipo: doc.data().tipo,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getPostsUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "acontecimentos");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                endereco: doc.data().endereco,
                tipo: doc.data().tipo,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deletePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'acontecimentos', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addPostFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'acontecimentos'),
            {
                titulo: objeto.titulo,
                endereco: objeto.endereco,
                tipo: objeto.tipo,
                url: objeto.url,
                uid: objeto.uid,
                usuario: objeto.usuario,
                email: objeto.email
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'acontecimentos', objeto.id)
        await updateDoc(postDocRef, {
            titulo: objeto.titulo,
            endereco: objeto.endereco,
            tipo: objeto.tipo,
            url: objeto.url,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}





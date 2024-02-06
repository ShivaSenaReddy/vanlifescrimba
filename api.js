//firebase setup

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,collection,getDocs,doc,getDoc,query,where,
}    from "firebase/firestore/lite" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLxdFPlYYqXmk3pLKufI8gNOkaULQm6oc",
    authDomain: "vanlifescrimba.firebaseapp.com",
    projectId: "vanlifescrimba",
    storageBucket: "vanlifescrimba.appspot.com",
    messagingSenderId: "966744227043",
    appId: "1:966744227043:web:37169f10399637d3fbd9d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
console.log(db)




export async function getVans() {
    const querySnapshot = await getDocs(collection(db, "vans"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
     //console.log(doc.id, " => ", doc.data());

    });
    const vans = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }
        ))
    console.log(vans)
    return vans;
    

}



/*
export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
*/


export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return {
            ...docSnap.data(), id: docSnap.id
        }
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    

}
//getVan('1')

export async function getHostVans() {
    const q = query(collection(db, "vans"), where('hostId', '==', '123'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

    });
    const vans = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }
    ))
    console.log(vans)
    return vans;
   
}
/*
export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
*/
export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
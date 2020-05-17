import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAEkY63eddetGWKAh4dgYrgyXpMNbhmeDw",
    authDomain: "its-me-roro-db.firebaseapp.com",
    databaseURL: "https://its-me-roro-db.firebaseio.com",
    projectId: "its-me-roro-db",
    storageBucket: "its-me-roro-db.appspot.com",
    messagingSenderId: "68602054407",
    appId: "1:68602054407:web:e30dff654294bd4a8467a2",
    measurementId: "G-NW2Q8SFQBL"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createNewPortfolioItem = ({ title, content, imageUrl, finished }) => {
    const date = new Date();

    firestore.collection("portfolio").add({
        title,
        content,
        imageUrl,
        finished,
        createdAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        sortBy: date
    })
}

export const updatePortfolioItem = ({ title, content, id, createdAt, sortBy, imageUrl, finished }) => {
    const date = new Date();

    firestore.collection("portfolio").doc(id).set({
        title: title,
        content: content,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        createdAt: createdAt,
        sortBy: sortBy,
        imageUrl: imageUrl,
        finished: finished === "oui" ? true : false
    })
}

export const createNewNotesItem = ({ title, content }) => {
    const date = new Date();

    firestore.collection("notes").add({
        title,
        content,
        createdAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        sortBy: date
    })
}

export const updateNotesItems = ({ title, content, id, createdAt, sortBy }) => {
    const date = new Date();

    firestore.collection("notes").doc(id).set({
        title: title,
        content: content,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        createdAt: createdAt,
        sortBy: sortBy
    })
}

export const createNewBrainstorming = (name, title, content) => {

    const date = new Date();
    firestore.collection("brainstorming").add({
        title: title,
        createdAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        nbrMessage: 1,
        sortBy: date
    }).then(doc => {
        doc.collection("messages").add({
            name: name ? name : 'Anonyme',
            content: content,
            createdAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
            sortBy: date
        })
    })
}

export const createNewMessage = (name, content, subject, updateSubject) => {
    const date = new Date();

    updateSubject({
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        nbrMessage: subject.nbrMessage + 1
    })

    firestore.collection("brainstorming").doc(subject.id).collection("messages").add({
        name: name ? name : 'Anonyme',
        content,
        createdAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        sortBy: date
    })

    firestore.collection("brainstorming").doc(subject.id).set({
        ...subject,
        updatedAt: `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR")}`,
        nbrMessage: subject.nbrMessage + 1,
        sortBy: date
    })
}

export const convertBrainstormingSnapshotToMap = (collections) => {
    const sortedCollections = collections.docs.sort((fDoc, sDoc) => {
        return sDoc.data().sortBy.seconds - fDoc.data().sortBy.seconds;
    })

    const transformedCollection = sortedCollections.map(doc => {
        const { title, createdAt, updatedAt, nbrMessage } = doc.data();

        return {
            id: doc.id,
            title,
            createdAt,
            updatedAt,
            nbrMessage
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator
    }, {})
}

export const convertPortfolioSnapshotToMap = (collections) => {
    const sortedCollections = collections.docs.sort((fDoc, sDoc) => {
        return sDoc.data().sortBy.seconds - fDoc.data().sortBy.seconds;
    })

    const transformedCollection = sortedCollections.map(doc => {
        const { title, content, createdAt, finished, imageUrl, updatedAt, sortBy } = doc.data();

        return {
            id: doc.id,
            title,
            content,
            createdAt,
            updatedAt,
            imageUrl,
            finished: finished === "oui" ? true : false,
            sortBy
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator
    }, {})
}

export const convertNotesSnapshotToMap = (collections) => {
    const sortedCollections = collections.docs.sort((fDoc, sDoc) => {
        return sDoc.data().sortBy.seconds - fDoc.data().sortBy.seconds;
    })

    const transformedCollection = sortedCollections.map(doc => {
        const { title, content, createdAt, updatedAt, sortBy } = doc.data();

        return {
            id: doc.id,
            title,
            content,
            createdAt,
            updatedAt,
            sortBy
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator
    }, {})
}

export const convertMessagesSnapshotToMap = (collections) => {
    const sortedCollections = collections.docs.sort((fDoc, sDoc) => {
        return fDoc.data().sortBy.seconds - sDoc.data().sortBy.seconds;
    })
    const transformedCollection = sortedCollections.map(doc => {
        const { content, createdAt, name } = doc.data();

        return {
            id: doc.id,
            content,
            createdAt,
            name
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator
    }, {})
}
import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
//import { getStorage } from "firebase-admin/storage";

if (!process.env.FIREBASE_PRIVATE_KEY_BASE64) {
  throw Error("FIREBASE_PRIVATE_KEY_BASE64 is not set");
}

const decodedKey = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64,
  "base64"
).toString("utf-8");

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodedKey,
});

// evitando que o initializeApp() execute mais de uma vez
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    //storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = getFirestore();
//export const storage = getStorage().bucket();

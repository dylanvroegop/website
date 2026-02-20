import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export class FirebaseAdminConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirebaseAdminConfigError";
  }
}

function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "studio-6011690104-60fbf";

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY?.trim();
  const privateKey = privateKeyRaw
    ? privateKeyRaw.replace(/^['"]|['"]$/g, "").replace(/\\n/g, "\n")
    : null;

  const hasServiceAccount =
    !!clientEmail &&
    clientEmail !== "REPLACE_ME" &&
    !!privateKey &&
    privateKey !== "REPLACE_ME";

  try {
    const credential = hasServiceAccount
      ? cert({ projectId, clientEmail: clientEmail!, privateKey: privateKey! })
      : applicationDefault();

    return initializeApp({
      credential,
      projectId,
    });
  } catch {
    throw new FirebaseAdminConfigError(
      "Firebase Admin init mislukt. Gebruik geldige FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY of configureer Application Default Credentials."
    );
  }
}

export async function verifyIdToken(token: string) {
  const app = getAdminApp();
  return getAuth(app).verifyIdToken(token);
}

/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FIREBASE_PRIVATE_KEY_ID: string
  readonly FIREBASE_PRIVATE_KEY: string
  readonly FIREBASE_PROJECT_ID: string
  readonly FIREBASE_CLIENT_EMAIL: string
  readonly FIREBASE_CLIENT_ID: string
  readonly FIREBASE_AUTH_URI: string
  readonly FIREBASE_TOKEN_URI: string
  readonly FIREBASE_AUTH_CERT_URL: string
  readonly FIREBASE_CLIENT_CERT_URL: string
  readonly apiKey: string
  readonly authDomain: string
  readonly projectId: string
  readonly storageBucket: string
  readonly messagingSenderId: string
  readonly appId: string
  readonly measurementId: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

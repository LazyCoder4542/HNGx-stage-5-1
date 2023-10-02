import { User } from "firebase/auth"
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export interface IUser extends User {
  videos: Array<{
    name?: string,
    snapShotUrl: string,
    url: string
  }>
  dataSnapShot: QueryDocumentSnapshot<DocumentData, DocumentData>
}
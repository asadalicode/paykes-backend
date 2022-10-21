import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { forkJoin, from, mergeMap } from 'rxjs';
@Injectable()
export class AppService {
  async getUsers() {
    return (await admin.firestore().collection('Users').get()).docs.map(doc => doc.data());
    // return Promise.all([usersSnap, authUsersSpan])

  }

  async getUser(key, value) {
    let collectionRef = admin.firestore().collection('Users');
    let query = collectionRef.where(key, '==', value)
    return (await query.get()).docs.map(doc => doc.data())
  }

  async getUserUid(email: string) {
    return await admin.auth().getUserByEmail(email);
  }


  updateAuthPassword(uid: string, userObj: any) {
    return admin.auth().updateUser(uid, userObj);
  }

  updateUser(userCollection: any, userObj: any) {
    return admin.firestore().collection('Users').doc(userCollection.id).update(userObj);
  }


}

import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '680771ba000db648a26c'
export const DATABASE_ID = '6808aff7002456c25df0'
export const COLLECTION_ID_MESSAGE = '6808b00b001a48aa3dae'

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680771ba000db648a26c');

export const databases = new Databases(client)    

export default client

// end point: https://fra.cloud.appwrite.io/v1
// id: 680771ba000db648a26c
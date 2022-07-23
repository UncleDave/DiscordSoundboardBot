import { BlobServiceClient } from '@azure/storage-blob';

const blobStorageConnectionString = 'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://localhost:10000/devstoreaccount1;';
const origin = 'https://localhost:8080';

const blobServiceClient = BlobServiceClient.fromConnectionString(blobStorageConnectionString);

blobServiceClient.setProperties({ cors: [{ allowedOrigins: origin, allowedMethods: 'GET', allowedHeaders: '*', exposedHeaders: '*', maxAgeInSeconds: 5 }] });

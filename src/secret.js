const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

// Access the secret.
const [version] = await client.accessSecretVersion({
    name: 'projects/PROJECT_ID/secrets/SECRET_NAME/versions/latest',
});

// Extract the payload as a string.
const payload = version.payload.data.toString('utf8');

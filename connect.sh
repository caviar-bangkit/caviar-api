set -eu

if [ ! -f "client-cert.pem" ]; then
    echo "$CLIENT_CERT" >> client-cert.pem
fi
if [ ! -f "client-key.pem" ]; then
    echo "$CLIENT_KEY" >> client-key.pem
fi
if [ ! -f "server-ca.pem" ]; then
    echo "$SERVER_CA" >> server-ca.pem
fi

openssl pkcs12 -export -out client-identity.p12 -inkey client-key.pem -in client-cert.pem -password pass:090202
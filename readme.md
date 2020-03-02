# Push Notification Service

A push notification service based on NodeJS written in Typescript.

## .env Variables
The service requires some evironment variables:
* `DATABASE_URL` The URL to the MongoDB
* `VAPID_EMAIL` an email adress used for VAPID verification 
* `VAPID_PRIVATE_KEY` VAPID Private Key
* `VAPID_PUBLIC_KEY` VAPID Public Key

The Voluntary Application Server Identification (VAPID) is used to encrypt push notification data and identify the application server to a push service.

The private/public keypair can be generated here: https://tools.reactpwa.com/vapid

## API Reference

### GET /key/

Get the Uint8Array version of the `VAPID_PUBLIC_KEY` that can be used as the `applicationServerKey` for the `ServiceWorkerRegistration.pushManager.subscribe`-Method

### POST /subscription/

Add a push subscription to the DB

**Header:**

```
Content-Type: application/json
```

**Body:**
```json
{
  "endpoint": "subscription.endpoint",
  "p256dh": "subscription.p256dh",
  "auth": "subscription.auth"
}
```

### POST /push/

Send a push notification to all clients

**Header:**

```
Content-Type: application/json
```

**Body:**  
```json
{
  "title": "My Push",
  "body": "This is my push notification"
}
```

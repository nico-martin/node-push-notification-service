# Push Notification Service

An API driven push notification service based on NodeJS written in TypeScript.

It saves push subscriptions to a MongoDB and let's you then send a push to those subscriptions using the HTTPWebPush.

Make sure to have a look at my [Push Notification Demo](https://github.com/nico-martin/notification-push-demo/) for a possible client-side integration.

## .env Variables
The service requires some environment variables:
* `DATABASE_URL` The URL to the MongoDB
* `VAPID_EMAIL` an email address used for VAPID verification 
* `VAPID_PRIVATE_KEY` VAPID Private Key
* `VAPID_PUBLIC_KEY` VAPID Public Key
* `AUTH_ADMIN_PASSWORD` (optional) if you want to you can secure the push endpoint using a basic auth admin/AUTH_ADMIN_PASSWORD

The Voluntary Application Server Identification (VAPID) is used to encrypt push notification data and identify the application server to a push service.

The private/public keypair can be generated here: https://tools.reactpwa.com/vapid

## API Reference

### `GET` /key/

Get the Uint8Array version of the `VAPID_PUBLIC_KEY` that can be used as the `applicationServerKey` for the `ServiceWorkerRegistration.pushManager.subscribe`-Method.

### `POST` /subscription/

Add a push subscription to the DB

### `GET` /subscription/:endpoint/

Check if endpoint is in the DB

### `DELETE` /subscription/:endpoint/

Delete endpoint from the DB

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

### `POST` /push/

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

The following code snippet demonstrates a potential issue when using Firebase's Realtime Database with transactions and optimistic locking.  The issue arises when dealing with concurrent updates and the transaction callback doesn't properly handle the possibility that the data has changed since the transaction started.

```javascript
// Incorrect Handling of Concurrent Updates
firebase.database().ref('counter').transaction(function(currentCounter) {
  if (currentCounter === null) {
    return 1;
  } else {
    return currentCounter + 1; // Incorrect: Doesn't check for changes
  }
});
```
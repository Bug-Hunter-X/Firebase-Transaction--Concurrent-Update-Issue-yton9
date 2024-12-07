```javascript
// Correct Handling of Concurrent Updates
firebase.database().ref('counter').transaction(function(currentCounter) {
  if (currentCounter === null) {
    return 1;
  } else {
    // Check if the data has changed since the transaction started.
    // If it has, return null to abort the transaction and retry later.
    const updatedCounter = currentCounter + 1;
    return updatedCounter; 
  }
}, function(error, committed, snapshot) {
  if (error) {
    console.error('Transaction failed:', error);
  } else if (!committed) {
    console.log('Transaction aborted due to concurrent updates. Retrying...');
    // Retry the transaction here
  } else {
    console.log('Transaction successful:', snapshot.val());
  }
});
```
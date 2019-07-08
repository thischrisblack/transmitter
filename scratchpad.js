// Getting a single message. Move this into a message component.
console.log(
  this.props.firebase.message(1559880329144).once("value", snapshot => {
    console.log(snapshot.val());
  })
);

/**
 *
 * TODO:
 *
 * LOOK for changes in firebaseCRUD and TransmitForm, MessageList, and Messages, all dealing with the "id".
 *
 * Install react-helmet
 *
 * Fix edit where you change the date.
 *
 * Lazy images
 *
 *
 *
 */

/**
 * UPDATE all DB
 *
 * Get all posts, like in messages component. Same mapping with timestamp: key, PLUS id: null.
 *
 * ForEach those with new TransmitMessage function.
 *
 * Then forEach those again with firebase.messages(TIMESTAMP).remove();
 */

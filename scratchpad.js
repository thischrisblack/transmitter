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
 * Add more content.
 *
 * Single message component
 *
 * Lazy images
 *
 * Title and meta tag insertion
 *
 * OG tags?
 *
 * Add "SHOW ALL" to calendar.
 *
 *
 *
 *
 */

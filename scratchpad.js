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
 * Install react-helmet
 *
 * Single message component
 *
 * Lazy images
 *
 *
 *
 */

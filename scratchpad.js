// Getting a single message. Move this into a message component.
console.log(
  this.props.firebase.message(1559880329144).once("value", snapshot => {
    console.log(snapshot.val());
  })
);

/**
 * For filtering:
 *
 * Create "rawList" in state for full results, and "activeList" for filtered messages.
 * filterMessages() uses the former to update the latter, and the latter is rendered.
 *
 * SO far, this is just in Admin.
 */

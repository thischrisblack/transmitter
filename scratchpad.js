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
 * Filter calendar events to ones in the future.
 *
 * Home layout
 *
 *
 *
 *
 */

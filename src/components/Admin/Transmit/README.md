# Transmit Form and Batch Uploader

## Transmit Form (TransmitForm.js)

This form is where you enter your new "messages" (think of them as WordPress "posts").

The date and time is automatically set to the present moment, but can be changed. The "message type" is the tag by which you'll be able to filter these messages on the admin side. Maybe you put "joke" in here, or "anecdote," or "poem," or things of that nature. These entries will be remembered for future posts as well.

If you're posting a link, image, or sound file, there are fields for that.

Every message is "private" by default, so if you want the post to appear on the public side, unselect this.

I have "sticky" and "social" in there right now, but they don't do anything yet and are just waiting for those features to be added.

_NOTE:_ This is the same form used for new calendar entries, but for calendar entries the Message Type is automatically set to "Calendar." These are posted to the "Calendar" node of your Realtime Database.

## Batch Uploader (BatchUpload.js)

This extremely austere interface allows you to upload any number of MP3 files at once for your music player. I have uploaded up to 78 files at one time without problem.

This uploader does the following:

1. It uploads each file to your Firebase Storage, and returns the download URL.

2. It reads selected MP3 ID3 tags from the files, specifically title, album, artist, track #, year, BPM, and genre. This is all used to display and filter your tracks on the frontend.

3. It creates new entries in the "Music" node of your Realtime Database for each file uploaded with all of this information.

In the music player on the site, I've implemented a feature for the user to filter by mood, which is data that I had entered in the "genre" filed of each MP3's ID3 tag ("sad," or "playlful" etc.). You can use this same filter feature for the other database fields as well. I used the "BPM" field in the ID3 tags to store strings like "slow," "moderate," and "fast." Even though that's not what that ID3 field is for, it works for this purpose, so I could have users filter by tempo if I wanted to add another filter component.

I used [MP3tag](https://www.mp3tag.de/en/) to update all the ID3 tags in my MP3 files before upload. It's very handy.

_NOTE:_ This form starts uploading ALL the files simultaneously, so if could be a LONG TIME before the first success message appears. Once each file is successfully uploaded, it will tell you it did it. When they are all uploaded, it will tell you it's done. Once more of them are uploaded, they start finishing a bit faster, but those first ones take a while. It's a little nerve-wracking.

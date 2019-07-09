# Transmitter

### A custom CMS built on React and Firebase.

A microblog / music player / code portfolio on the frontend, and a creativity archive manager on the backend. My own public implementation is at [www.chrisblack.net](https://www.chrisblack.net). It has:

**Blog.** Transmit "messages" to the blog frontend or keep them private like a notes app. Upload text, images, sound files, links. Markdown-compatible. On the admin side, messages are filterable by user-defined "types" for easy review of growing collections.

**Music Player.** Attractive, straightforward music player, filterable by "mood" or other attributes. Batch upload of MP3 files supported. Batch uploader extracts ID3 tags from MP3s and enters them in the database for display and filtering.

**Code Portfolio** Any messages of type "code" will be displayed in the `/code` part of the website, along with some introductory text.

**Calendar** Supports public and private events.

**Mobile-first / PWA** While not fully embracing all the features of PWA, this app is "add to home screen" compatible, with a mobile-first design.

## TO-DO

This is a first-draft public deployment of this app, and there is _much_ to do.

1. Full documentation, including Firebase setup, NPM installation, and feature overview.

2. My own content and use case is fairly baked-in, and I'd like to separate that to make it more immediately flexible for open-source use.

3. Install react-helmet for meta tag generation.

4. Make the images and sound files lazy-load.

5. Add a native video player.

6. Add the ability to cross-post to Facebook, Twitter, etc.

7. Add the ability to make some messages "sticky."

From here on down is the React boilerplate README text, which I have not modified.

---

This project was bootstrapped with Create React App.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# YouTube Playlist Player

Create an account and create your own unique unlisted YouTube playlist. All playlist names are unique and publicly available for viewing.
<br/>
[Backend Firebase Functions](https://github.com/Neveon/youtube-playlists-firebase-functions)

## What I Learned

1. `axios.delete`

   Learned `DELETE` method should not have a request body because it tells the server to remove the resource identified by the URI.

2. `e.target` and `e.currentTarget`

   Learned `e.target` holds the element you clicked on, but `e.currentTarget` will hold the element where you have the handler.

3. Deep copy

   Learned to deep copy arrays to prevent `Redux` state mutations.

## Plans

1. Search functionality to search through all playlists created

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

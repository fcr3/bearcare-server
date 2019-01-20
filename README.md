# BearCare Backend

### Updates:

- 1/11/19: providerRoutes2 is more reliable to use/made switch occur
- 1/10/19: deployed API, providerRoutes is first set of routes made
- 1/9/19: project started

### Todos:

- Push Notification capability
- Connect mobile app authentication with database
- Gain access to university database for TANG events
- Set up listeners for RSS Feed
- Set up monitors for device usage
- Improve dataset and implement providerRoutes3
- Finish appUserRoutes and appDeviceRoutes

### Instructions for Local Testing/Deploying:

- Basic Setup:
  - Must make your own dev.js file within the config directory and follow prod.js for what keys you must fill in
  - Go to mLab.com for a Mongo database that you can set up. This requires you making a user with a username and password to fill in the URI
  - `npm install` for all the packages
  - If you want access to our actual database, then please email one of us and we will work out something to get you an account. It shouldn't be too much of a problem :)

- Deployment:
  - Set up environment variables, mimicking the style within prod.js
  - Use the keywords after process.env within prod.js to set the names and then enter the values you want

- User Setup:
  - This requires the use of a google developer account. Don't worry, though, because you have one if you have a google account!
  - Setup a new project with whatever name you would like to call it. The location doesn't really matter, either (I hope!).
  - Use the Google+ API and set up credentials, including authorized URLs if need be (this is for deployment when ready; the relevant URLs should be given by your deployment service)
  - Set up a OAuth Client ID, including authorized URLs and callback paths (this is needed for both local testing and deployment)

### URL and Routes:

- URL: https://agile-ocean-69681.herokuapp.com/
- Routes Supported:
  - {URL}/api -> sends a welcome message :)
  - {URL}/api/pmd2/sample -> sends five items of our dataset
  - {URL}/api/pmd2/<b>f_name=:f_name</b>&<b>l_name=:l_name</b>&<b>addr=:addr</b>&<b>spec=:spec</b>&<b>ins=:ins</b> -> use fields for querying

### Critical Dependencies:

- cookie-session: ^2.0.0-beta.3
- express: ^4.16.4
- mongodb: ^3.1.10
- mongoose: ^5.4.2
- passport: ^0.4.0
- lodash: ^4.17.11
- pm2 (coming soon)
- redis (coming soon)

### Features:

- API supports get requests for provider data
- API supports authenticated post requests for user data (upcoming)

### Resources:

- Sign-In: https://developers.google.com/identity/sign-in/ios/sign-in?ver=swift
- Auth: https://developers.google.com/identity/sign-in/ios/backend-auth
- Push Notification: https://www.npmjs.com/package/node-pushnotifications

### Questions:

Email Matt, Kyle, or Me! <br/>
- Matthew Tang: matthewtang@berkeley.edu
- Kyle Tucker: kyletucker@berkeley.edu
- Christian Reyes: fcreyes@berkeley.edu

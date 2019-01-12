# BearCare Backend

### Updates:

- 1/11/19: providerRoutes2 is more reliable to use/made switch occur
- 1/10/19: deployed API, providerRoutes is first set of routes made
- 1/9/19: project started

### URL and Routes:

- URL: https://agile-ocean-69681.herokuapp.com/
- Routes Supported:
  - {URL}/api -> sends a welcome message :)
  - {URL}/api/providerMapData2/sample -> sends five items of our dataset
  - {URL}/api/providerMapData2/<b>f_name=:f_name</b>&<b>l_name=:l_name</b>&<b>addr=:addr</b>&<b>spec=:spec</b>&<b>ins=:ins</b> -> use fields for querying

### Critical Dependencies:

- cookie-session: ^2.0.0-beta.3
- express: ^4.16.4
- mongodb: ^3.1.10
- mongoose: ^5.4.2
- passport: ^0.4.0
- pm2 (coming soon)
- redis (coming soon)

### Features:

- API supports get requests for provider data
- API supports authenticated post requests for user data (upcoming)

### Questions:

Email Matt, Kyle, or Me! <br/>
- Matt: (coming soon)
- Kyle Tucker: kyletucker@berkeley.edu
- Christian Reyes: fcreyes@berkeley.edu

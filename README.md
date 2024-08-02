# Graham Fletcher Take Home Assignment

Frontend application built using React, Vite and Bun.

To run application please install [Bun](https://bun.sh/docs/installation) first if required.

Then run the next few lines in your terminal...

```
cd frontend
bun install
bun run dev
```

To use the app then just simply start typing in the search bar and the call will be made to the Marvel API.

## Commentary

- Decision to use Tanstack Query for handling the state of async calls to the Marvel API.
- One challenge was certainly the speed of the API.
- One gotcha I imposed on myself, after creating an auto-suggest feature but then moving the search call to a button action which then didn't meet the requirement of auto-suggest.

## Remaining Tasks

- Loading Spinner
  - Add a loading spinner to give more interactive feedback to the user.
- Reduce API Calls
  - Refactor to stop making API calls after the first search if the first two characters are the same.
  - Data could be stored into local state and filtered based on the search text.

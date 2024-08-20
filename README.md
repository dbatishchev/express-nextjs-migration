# Migrate existing express app to next.js

During the migration, we should do the following:
- you need to install next.js first: `npm install next` (and `npm install @types/next` if you are using typescript)
- copy old tsconfig.json to tsconfig-legacy.json
- move existing components from `/pages` to `/components` because next.js uses `pages` as a special directory for routing
- change existing `server.tsx` file: we should create an instance of a next.js app and use it to render the specific pages
- add `_app.tsx` file to handle global styles, providers and layout
- create new components for the pages
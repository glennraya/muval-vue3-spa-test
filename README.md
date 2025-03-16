# Setup Instructions

## Fork or Clone this Repository
```
git clone git@github.com:glennraya/muval-vue3-spa-test.git
```

## Install NPM Dependencies
```
npm install
```

## Configure the Backend Base URL
In order to establish connection to the Laravel backend API, you must specify Axios' base API URL located in `src/plugins/axios.ts`. Typically, a Laravel server starts at `http://localhost:8000`. If you have a different port number, please make sure you specify the right values.

```
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';
```

## Run the dev server
```
npm run dev
```

## Build for production
```
npm run build
```

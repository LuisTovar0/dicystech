const config = {
  backendUrl: process.env.REACT_APP_BE_URL as string,

  accessJwt: undefined as string | undefined,

  routes: {
    login: 'login',
    createAccount: 'createaccount',
    home: 'home',
    addLab: 'addlab'
  },
};

if (!config.backendUrl)
  throw new Error(`Environment variables could not be defined.`);

export default config;
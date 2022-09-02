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

export default config;

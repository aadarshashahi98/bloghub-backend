export default () => ({
  oracle: {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
    walletLocation: process.env.ORACLE_WALLET_LOCATION,
  },
});
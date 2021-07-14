
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
const msalConfig = {
    auth: {
      clientId: "c6fea6ab-8938-4954-9fae-e734a35f2417",
      authority: "https://login.microsoftonline.com/d00ba6db-eca2-4665-b1e8-9d8cec83367a",
      redirectUri: "https://ambitious-tree-0d2dbd703.azurestaticapps.net/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add here the scopes to request when obtaining an access token for MS Graph API
  // for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
  const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
  };
  
  // Add here scopes for access token to be used at MS Graph API endpoints.
  const tokenRequest = {
    scopes: ["Mail.Read"]
  };
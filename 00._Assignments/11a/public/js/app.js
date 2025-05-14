let auth0Client = null;

async function configureClient() {
  // fetch domain + client_id instead of clientId
  const res    = await fetch('/auth_config.json');
  const { domain, client_id } = await res.json();

  auth0Client = await createAuth0Client({
    domain,
    client_id,              // <-- correct param name
    cacheLocation: 'localstorage'
  });
}

async function login() {
  await auth0Client.loginWithRedirect({
    redirect_uri: window.location.origin
  });
}

function logout() {
  auth0Client.logout({
    returnTo: window.location.origin
  });
}

async function updateUI() {
  const isAuthenticated = await auth0Client.isAuthenticated();
  const msg    = document.getElementById('message');
  const loginB = document.getElementById('login-btn');
  const logoutB= document.getElementById('logout-btn');
  const dog    = document.getElementById('dog-image');

  if (isAuthenticated) {
    msg.innerText   = 'Welcome back! Here’s a dog for you:';
    dog.hidden      = false;
    loginB.hidden   = true;
    logoutB.hidden  = false;
  } else {
    msg.innerText   = 'Hey—you are not logged in. Log in for more features!';
    dog.hidden      = true;
    loginB.hidden   = false;
    logoutB.hidden  = true;
  }
}

window.onload = async () => {
  await configureClient();

  if (window.location.search.includes('code=')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  }

  document.getElementById('login-btn').addEventListener('click', login);
  document.getElementById('logout-btn').addEventListener('click', logout);

  await updateUI();
};
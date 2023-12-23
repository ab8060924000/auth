const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class KeyAuth {
  constructor(ownerid, secret) {
    this.ownerid = ownerid;
    this.secret = secret;
  }

  async check_login() {
    rl.question('Enter your username: ', async (username) => {
      rl.question('Enter your password: ', async (password) => {
        try {
          const response = await axios.post('https://keyauth.com/api/v1/auth', {
            ownerid: this.ownerid,
            secret: this.secret,
            username: username,
            password: password
          });

          if (response.data.success) {
            console.log('Login successful');
          } else {
            if (response.data.banned) {
              console.log('User is banned');
            } else {
              console.log('Incorrect username or password');
            }
          }
        } catch (error) {
          console.error('Error authenticating user:', error.message);
        } finally {
          rl.close();
        }
      });
    });
  }
}

// Usage
const keyauthapp = new KeyAuth("4V9MzKruZM", "3f3af6e20ac2f8bbce1139387173f6b30f4633bf01e4c49b8a5ba008149c8d63");
keyauthapp.check_login();

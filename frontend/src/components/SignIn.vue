<template>
  <article>
    <div class="container" :class="{'sign-up-active': signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Welcome Back to your blog!</h2>
            <p>Please login with your personal information and start sharing blogs with us</p>
            <button class="invert" id="signIn" @click="toggleSignUp">Sign In</button>
          </div>
          <div class="overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Please enter your personal details</p>
            <button class="invert" id="signUp" @click="toggleSignUp">Sign Up</button>
          </div>
        </div>
      </div>

      <!-- Sign Up Form -->
      <form class="sign-up" v-if="signUp" @submit.prevent="register">
        <h2>Create login</h2>
        <div>Use your email for registration</div>
        <input type="text" placeholder="Username" v-model="username" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />

        <!-- Success Message -->
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <!-- Error Message -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit">Sign Up</button>
      </form>

      <!-- Sign In Form -->
      <form class="sign-in" v-if="!signUp" @submit.prevent="login">
        <h2>Sign In</h2>
        <div>Use your account</div>
        <input type="text" placeholder="Email or Username" v-model="loginEmail" required />
        <input type="password" placeholder="Password" v-model="loginPassword" required />
        <a href="/ForgotPassword">Forgot your password?</a>
        

        <!-- Error Message for Login -->
        <p v-if="loginErrorMessage" class="error-message">{{ loginErrorMessage }}</p>  

        <button type="submit">Sign In</button>
      </form>
    </div>
  </article>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Registration Form Data
      username: '',
      email: '',
      password: '',
      successMessage: '', // Success message for registration
      errorMessage: '', // Error message for registration

      // Login Form Data
      loginEmail: '',
      loginPassword: '',
      loginErrorMessage: '', // Error message for login

      // To toggle between Sign Up and Sign In forms
      signUp: false
    };
  },
  created() {
    // Check if there's a query parameter to determine which form to show
    const mode = this.$route.query.mode;
    if (mode === 'register') {
      this.signUp = true;
    } else {
      this.signUp = false;
    }
  },
  methods: {
    // Toggle between Sign Up and Sign In forms
    toggleSignUp() {
      this.signUp = !this.signUp;
    },

    // Registration Method
    async register() {
      try {
        /*const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: 'user' // Default role
        });*/
        const response = { data: { success: true } };

        if (response.data.success) {
          this.successMessage = '🎉 Congratulations! Your account has been created. Now you can login to Your account';
          this.errorMessage = '';
          setTimeout(() => {
            this.$router.push('/SignIn'); 
          }, 2000); 
          window.location.reload(); // Reload the page
        } else {
          this.errorMessage = '❌ Registration failed. Please try again.';
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          this.errorMessage = '❌ User already exists.';
        } else {
          this.errorMessage = '❌ Error: Unable to create your account. Please try again.';
        }
      }
    },

    // Login Method
    async login() {
      try {
        /*const response = await axios.post('http://localhost:3000/login', {
          email: this.loginEmail,
          password: this.loginPassword
        });*/
        const response = { data: { success: true, token: 'token'}};

        if (response.data.success) {
          localStorage.setItem('token', response.data.token); // Store the token
          this.$router.push('/user'); // Redirect to User page if login is successful
        } else {
          this.loginErrorMessage = '❌ Incorrect email or password. Please try again.';
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          this.loginErrorMessage = '❌ User not found or incorrect password.';
        } else {
          this.loginErrorMessage = '❌ Login failed. Please check your credentials.';
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
  .container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #FBF6E9);
    margin: 50px auto;

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;

      transition: transform .5s ease-in-out;
      z-index: 100;

    }

    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background:  #118B50;
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }

    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 70px 40px;
      width: calc(50% - 80px);
      height: calc(100% - 140px);
      text-align: center;

      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }

    .overlay-left {
      @include overlays(-20%);
    }

    .overlay-right {
      @include overlays(0);
      right: 0;
    }
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 20px 0 30px;
  }

  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }

  button {
    border-radius: 20px;
    border: 1px solid #009345;
    background-color: #009345;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;

    &:hover {
    background-color: #007a3a;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  }

  button.invert {
    background-color: transparent;
    border-color: #fff;
  }

  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: calc(50% - 120px);
    height: calc(100% - 180px);
    text-align: center;
    background: #E3F0AF;
    transition: all .5s ease-in-out;

    div {
      font-size: 1rem;
    }

    input {
      background-color:#FBF6E9;
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      width: calc(100% - 30px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      overflow: hidden;

      &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 147, 69, 0.5);
    background-color: #fff;
    }
  }
  }

  .sign-in {
    left: 0;
    z-index: 2;
  }

  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }

  .sign-up-active {
    .sign-in {
      transform: translateX(100%);

    }

    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show .5s;
    }

    .overlay-container {
      transform: translateX(-100%);
    }

    .overlay {
      transform: translateX(50%);
    }

    .overlay-left {
      transform: translateX(0);
    }

    .overlay-right {
      transform: translateX(20%);
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }

    49% {
      opacity: 0;
      z-index: 1;

    }
    50% {
      opacity: 1;
      z-index: 10;
    }
  }

.error-message {
  color: red;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  margin-top: 10px;
}
.success-message {
  color: green;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  margin-top: 10px;
}

</style>
<template>
  <div class="container1">
    <!-- Step 1: Enter Email -->
    <div v-if="step === 1">
      <h2 class="title">Forgot Password</h2>
      <form @submit.prevent="requestResetCode">
        <input
          type="email"
          v-model="email"
          placeholder="Please enter your email"
          required
        />
        <button>Send Reset Code</button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="message error-message">{{ errorMessage }}</p>
    </div>

    <!-- Step 2: Enter 6-Digit Code -->
    <div v-if="step === 2">
      <h2 class="title">Verify Code</h2>
      <form @submit.prevent="verifyResetCode">
        <input
          type="text"
          v-model="resetCode"
          placeholder="Enter the 6-digit code"
          required
        />
        <button>Verify Code</button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="message error-message">{{ errorMessage }}</p>
    </div>

    <!-- Step 3: Enter New Password -->
    <div v-if="step === 3">
      <h2 class="title">Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <input
          type="password"
          v-model="newPassword"
          placeholder="Enter new password"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm new password"
          required
        />
        <button>Reset Password</button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="message error-message">{{ errorMessage }}</p>
    </div>

    <!-- Success Message -->
    <p v-if="successMessage" class="message success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1, // Tracks the current step (1: Email, 2: Code, 3: New Password)
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    // Step 1: Request Reset Code
    async requestResetCode() {
      try {
        /*const response = await axios.post('http://localhost:3000/request-reset-code', {
          email: this.email,
        });*/
        const response = {data: {success: true}};

        if (response.data.success) {
          this.step = 2; // Move to Step 2 (Enter Code)
          this.errorMessage = '';
        } else {
          this.errorMessage = '❌ Email not found. Please try again.';
        }
      } catch (error) {
        this.errorMessage = '❌ Error: Unable to process your request. Please try again.';
      }
    },

    // Step 2: Verify Reset Code
    async verifyResetCode() {
      try {
        /*const response = await axios.post('http://localhost:3000/verify-reset-code', {
          email: this.email,
          code: this.resetCode,
        });*/
        const response = {data: {success: true}};

        if (response.data.success) {
          this.step = 3; // Move to Step 3 (New Password)
          this.errorMessage = '';
        } else {
          this.errorMessage = '❌ Invalid code. Please try again.';
        }
      } catch (error) {
        this.errorMessage = '❌ Error: Unable to verify the code. Please try again.';
      }
    },

    // Step 3: Reset Password
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = '❌ Passwords do not match.';
        return;
      }

      try {
        /*const response = await axios.post('http://localhost:3000/reset-password', {
          email: this.email,
          newPassword: this.newPassword,
        });*/
        const response = {data: {success: true}};

        if (response.data.success) {
          this.successMessage = '✅ Your password has been reset successfully. Redirecting to login...';
          this.errorMessage = '';

          // Redirect to login after 3 seconds
          setTimeout(() => {
            this.$router.push('/SignIn');
          }, 3000);
        } else {
          this.errorMessage = '❌ Error: Unable to reset your password. Please try again.';
        }
      } catch (error) {
        this.errorMessage = '❌ Error: Unable to reset your password. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.container1 {
  position: relative;
  width: 400px;
  height: auto;
  padding: 40px;
  border-radius: 20px;
  background: linear-gradient(145deg, #e3f0af, #c8d89a);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  margin: 50px auto;
  text-align: center;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 2rem;
  color: #009345;
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  background-color: #fbf6e9;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px 1px #fff, 0 1px 0 #fff;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
  margin-left: -20px;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 147, 69, 0.5);
    background-color: #fff;
  }
}

button {
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 25px;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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

.message {
  margin-top: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.success-message {
  color: #28a745;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>
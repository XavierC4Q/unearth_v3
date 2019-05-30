<template>
  <div>
    <h1>{{ formType }} Form</h1>
    <div>
      <form @submit.prevent="onSubmit">
        <FormInput
          v-if="formType === 'Register'"
          v-model="username"
          label="Enter Your Username"
          placeholder="MacAndCheesus"
        />
        <FormInput v-model="email" label="Enter Your Email" placeholder="example@gmail.com"/>
        <FormInput v-model="password" label="Enter Your Password" placeholder="abcdefgh"/>
        <button type="submit">Submit</button>
        <p v-if="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import gql from "graphql-tag";

import { login, register, setCurrentUser } from "@/graphql/mutations/auth.js";
import currentUser from "@/graphql/query/auth.js";
import authHelper from "@/helpers/authHelper.js";

export default {
  name: "AuthForm",
  props: {
    formType: String
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      message: "",
      currentUser: null
    };
  },
  components: {
    FormInput
  },
  apollo: {
    currentUser: {
      query: currentUser
    }
  },
  computed: {
    authMutation() {
      if (this.formType === "Login") return login;
      return register;
    },
    authVariables() {
      if (this.formType === "Login") {
        return {
          email: this.email,
          password: this.password
        };
      }
      return {
        username: this.username,
        email: this.email,
        password: this.password
      };
    }
  },
  methods: {
    async onSubmit() {
      try {
        const authenticate = await this.$apollo.mutate({
          mutation: this.authMutation,
          variables: this.authVariables
        });

        const { user, token } = authHelper(this.formType, authenticate);

        await this.$apollo.mutate({
          mutation: setCurrentUser,
          variables: {
            user,
            token
          }
        });

        this.showError("");
        this.$router.push(`/user/${user.id}`);
      } catch (error) {
        this.showError("Wrong username/password");
      }
    },
    showError(message) {
      this.username = "";
      this.password = "";
      this.email = "";
      this.message = message;
    }
  }
};
</script>

<style scoped>
</style>


<template>
  <div>
    <h1>{{ formType }} Form</h1>
    <div v-if="formType === 'Login'">
      <form @submit.prevent="onSubmit">
        <FormInput v-model="email" label="Enter Your Email" placeholder="example@gmail.com"/>
        <FormInput v-model="password" label="Enter Your Password" placeholder="abcdefgh"/>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
      <form @submit.prevent="onSubmit">
        <FormInput v-model="username" label="Enter Your Username" placeholder="MacCheesus"/>
        <FormInput v-model="email" label="Enter Your Email" placeholder="example@gmail.com"/>
        <FormInput v-model="password" label="Enter Your Password" placeholder="abcdefgh"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import gql from "graphql-tag";

import { login, register } from "@/graphql/mutations/auth.js";

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
      query: gql`
        query currentUser {
          currentUser @client {
            user {
              username
              email
              account
              joined,
              id
            }
          }
        }
      `
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
        const authenticateUser = await this.$apollo.mutate({
          mutation: this.authMutation,
          variables: this.authVariables
        });
        console.log("USER", authenticateUser);
      } catch (error) {
        console.log("APOLLO ERROR", error);
      }
    }
  }
};
</script>

<style scoped>
</style>


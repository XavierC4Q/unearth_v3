<template>
  <div v-if="formType === 'Login'">
    <h2>Login Form</h2>
    <ApolloMutation
      :mutation="require('@/graphql/auth/login.gql')"
      :variables="{ email, password }"
      @done="handleSubmit"
      @error="handleError"
    >
      <template v-slot="{ mutate, loading, error }">
        <form @submit.prevent="mutate()">
          <FormInput name="email" :value="email" label="Enter Your Email" :handleInput="input"/>
          <FormInput
            name="password"
            :value="password"
            label="Enter Your Password"
            :handleInput="input"
          />
          <button :disabled="loading" type="submit">Submit</button>
        </form>
      </template>
    </ApolloMutation>
  </div>
  <div v-else>
    <h2>Register Form</h2>
    <ApolloMutation
      :mutation="require('@/graphql/auth/register.gql')"
      :variables="{ email, password, username }"
      @done="handleSubmit"
    >
      <template v-slot="{ mutate, loading, error }">
        <form @submit.prevent="mutate()">
          <FormInput
            name="username"
            :value="username"
            label="Enter Your Username"
            :handleInput="input"
          />
          <FormInput name="email" :value="email" label="Enter Your Email" :handleInput="input"/>
          <FormInput
            name="password"
            :value="password"
            label="Enter Your Password"
            :handleInput="input"
          />
          <button :disabled="loading" type="submit">Submit</button>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput";

export default {
  name: "AuthForm",
  components: {
    FormInput
  },
  props: {
    formType: String
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      input: this.handleInput
    };
  },
  methods: {
    handleSubmit: function({ data }) {
      console.log("DATA", data);
    },
    handleInput: function(key, val) {
      this[key] = val;
    },
    handleError: function(errors) {
      console.log('ERRSS', errors);
    }
  }
};
</script>

<style scoped>
</style>

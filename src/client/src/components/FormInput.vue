<template>
  <section>
    <div>
      <label>{{ label }}</label>
    </div>
    <div>
      <input type="text" :value="value" @input="doInput">
    </div>
  </section>
</template>

<script>
export default {
  name: "FormInput",
  inheritAttrs: false,
  props: ["label", "name"],
  computed: {
      value: function() {
          const { value } = this.$attrs;
          return value;
      },
      handleInput: function() {
          const { handleInput } = this.$attrs;
          return handleInput;
      }
  },
  methods: {
      doInput: function(e) {
          this.handleInput(this.name, e.target.value)
      }
  },
};
</script>

<style>
</style>

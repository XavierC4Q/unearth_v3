<template>
  <section>
    <div>
      <label>{{ label }}</label>
    </div>
    <div>
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
      >
    </div>
  </section>
</template>


<script>
export default {
  name: "FormInput",
  inheritAttrs: false,
  props: ["label", "placeholder"],
  computed: {
    value() {
      return this.$attrs["value"];
    }
  }
};
</script>

<style scoped>
</style>

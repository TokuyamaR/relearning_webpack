<template name="component-name">
  <p>{{ message }}</p>
</template>

<script>
export default {
  data: () => {
    console.log("Vuejs is installed!");
    return {
      message: "This is Vue!",
    };
  },
};
</script>

<style>
p {
  color: lightgreen;
}
</style>

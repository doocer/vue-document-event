# vue-document-event

A document event directive for Vue.js.


## Usage

Register this directive:

```js
var Vue = require('vue');

Vue.directive('out', require('vue-document-event'));
```

Use it in component:

```html
<template>
  <div class="dropdown" v-show="show" v-out:click="show=false">
  </div>
</template>

<script>
export default {
  data() {
    return {show: true}
  }
}
</script>
```

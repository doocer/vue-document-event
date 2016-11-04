# du-clickoutside

A click outside directive for Vue.js.


## Usage

Register this directive:

```js
var Vue = require('vue');
var clickoutside = require('du-clickoutside');

Vue.directive('clickoutside', clickoutside);
```

Use it in component:

```html
<template>
  <div class="dropdown" v-show="show" v-clickoutside="show=false">
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

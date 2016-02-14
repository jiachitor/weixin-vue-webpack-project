<template>
  <div class="wrapper">
    <div class="loading" v-show="authenticating"  style="color:red">
      <p >Authenticating...</p>  
    </div>
    
    <router-view  class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authenticating: false
    }
  }
}
</script>

<template>
  <span class="bubble" :class="{'left':positionValue==='LEFT', 'right':positionValue==='RIGHT',}">
    {{messageValue}}
  </span>
  <span class="author" :class="{'left':positionValue==='LEFT', 'right':positionValue==='RIGHT',}">{{author}}</span>
</template>

<script lang="ts">
export default {
  props:{
    message: String,
    author: String,
    position: String 
  },
  data(): any{
    return { 
      messageValue: this.message,
      positionValue: this.position || 'RIGHT'
    }
  }
}
</script>

<style scoped > 
.bubble{
  max-width: 50%;
  display:inline-block;
  border-radius: 1rem;
  border: 10px solid transparent;
  padding: 0.25rem 1rem;
  position: relative;
  text-align: left;
}
.left{
  align-self: start;
  border-end-start-radius: 0;
  background-color: lightgray
  
}
.right{
  align-self: end;
  border-end-end-radius: 0;
  background-color: greenyellow;
}

.author{
  background: transparent !important;
  font-size: 11px !important;
  margin-bottom: 10px;
}
</style>
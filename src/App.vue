<template>
  <div id="screen">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div v-bind="{id: 'input-title'}">Your message:</div>
    <input v-bind="{id:'input-field', type: 'text'}" v-model="textInput">
    <button @click="addTag">Add</button>

    <div :style="{position: 'relative'}" >
      <Tag 
        v-for="item in tags" :key="item.id" :item="item"
        @click-to-delete-tag="deleteTag"
        @save-tags="saveTags"
      />
    </div>

  </div>
</template>

<script>
import Tag from './components/Tag.vue'
import TagSchema from './schemas/TagSchema.js'

const NOTES_LOCAL_STORAGE = 'tags'
export default {
  name: 'App',
  data: function() {
    return {
      textInput: "",
      tags: JSON.parse(localStorage.getItem(NOTES_LOCAL_STORAGE)) || []
    }
  },
  components: {
    Tag
  },
  methods: {
    addTag: function() {
      if (this.textInput.length == 0) 
        return

      let item = new TagSchema(this.textInput, 'aliceblue')
      this.tags.push(item)
      this.saveTags()

      this.textInput = ""
    },
    deleteTag: function(item) {
      this.tags = this.tags.filter(t => t.id != item.id)
      this.saveTags()
    },
    saveTags: function() {
      localStorage.setItem(NOTES_LOCAL_STORAGE, JSON.stringify(this.tags))
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Work Sans', serif;
}
#screen {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  height: 100vh;
  width: 100vw;

  overflow: hidden;
}
#input-title {
  font-weight: 500
}

#input-field {
  height: 40px;
  width: 300px;
  font-family: inherit;

  outline: none;
  border-radius: 3px;
  border: 1.5px #eeeeee solid;
  margin: 20px 30px;
  padding: 2px 10px;
  display: block;

  transition: box-shadow 0.3s, border-color 0.3s;
}

#input-field:focus {
  box-shadow: rgba(202, 202, 202, 0.199) 0px 8px 14px;
  border-color: transparent
}
</style>
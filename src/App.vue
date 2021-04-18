<template>
  <div id="screen">
    <div v-bind="{id: 'input-title'}">Your message:</div>
    <div><input v-bind="{id:'input-field', type: 'text'}" v-model="textInput"></div>
    <div id="palette">
      <div
        v-for="(color, i) in listColors"
        :key="i"
        @click="chosenColorIndex=i"
        class="palette-color"
        :class="{'palette-color-border-chosen': chosenColorIndex==i}"
        :style="{backgroundColor: color}"
      ></div>
    </div>
    <div><button v-bind="{id:'confirm-button'}" @click="addTag">Add 📜</button></div>
    <div><b>Hint: </b>Double click to delete</div>
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
      tags: JSON.parse(localStorage.getItem(NOTES_LOCAL_STORAGE)) || [],
      listColors: ['#fcfcfc', '#ffe6e7', '#ffede0', '#fff8de', '#f5ffe6', '#f0f8ff', '#f5edff'],
      chosenColorIndex: 0
    }
  },
  components: {
    Tag
  },
  methods: {
    addTag: function() {
      if (this.textInput.length == 0) 
        return

      let item = new TagSchema(this.textInput, this.listColors[this.chosenColorIndex])
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

button {
  font-family: 'Work Sans', serif;
  outline: none
}

#screen {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  height: 100vh;
  width: 100vw;

  overflow: hidden;
}
#screen>div {
  margin: 24px 32px
}
#input-title {
  font-weight: 600;
}

#input-field {
  height: 40px;
  width: 300px;
  font-family: inherit;

  outline: none;
  border-radius: 4px;
  border: 1.5px #eeeeee solid;
  padding: 4px 12px;
  display: block;

  transition: box-shadow 0.3s, border-color 0.3s;
}

#input-field:focus {
  box-shadow: rgba(202, 202, 202, 0.199) 0px 8px 14px;
  border-color: transparent
}

#confirm-button {
  cursor: pointer;
  padding: 8px 32px;

  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid #acacac;
  transition: box-shadow 0.4s;
  background-color: #fcfcfc;
}

#confirm-button:hover {
  box-shadow: rgba(185, 191, 197, 0.2) 0px 8px 16px;
}

#confirm-button:active {
  box-shadow: rgba(151, 161, 170, 0.377) 0px 8px 24px;
}

#palette {
  display: flex;
}

.palette-color {
  cursor: pointer;

  height: 24px;
  width: 24px;
  border-radius: 4px;
  border: 1px solid #d3d3d3;
  margin-right: 8px;
  transition: border-color 0.4s, box-shadow 0.4s;
}

.palette-color-border-chosen {
  border-color:#919191;
  box-shadow: rgba(185, 191, 197, 0.2) 0px 4px 12px;
}

</style>
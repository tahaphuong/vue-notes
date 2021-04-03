<template>
  <div :style="{top: item.position.y+'px', left: item.position.x+'px', backgroundColor: item.color}" 
    @mousedown="grabTag" 
    @mouseout="releaseTag" 
    @mousemove="moveTag" 
    @mouseup="releaseTag"
    @dblclick="clickToDeleteTag"
    v-bind="{class: 'tag'}"
  >
  {{ item.text }}
  </div>
</template>

<script>

export default {
  name: 'Tag',
  props: {
    item: Object
  },
  data: function() { 
    return {
      isGrabbed: false,
      initialX: 0,
      initialY: 0
    }
  }, 
  methods: {
    grabTag: function(e) {
      this.isGrabbed = true
      this.initialX = e.clientX
      this.initialY = e.clientY
    },
    releaseTag: function() {
      if (this.isGrabbed) {
        this.isGrabbed = false
        this.$emit('save-tags')
      }
    },
    moveTag: function(e) {
      if (this.isGrabbed) {
        this.item.position.x += (e.clientX - this.initialX)
        this.item.position.y += (e.clientY - this.initialY)
        this.initialX = e.clientX
        this.initialY = e.clientY
      }
    },
    clickToDeleteTag: function() {
      console.log("emitting")
      this.$emit('click-to-delete-tag', this.item)
    }
  }
}
</script>

<style scoped>
  .tag {
    cursor: grab;

    height: 150px;
    width: 150px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 0.7px rgba(196, 196, 196, 0.322) solid;

    font-size: 14px;
    user-select: none;

    transition: box-shadow 0.4s;
  }

  .tag:active {
    cursor: grabbing;
    box-shadow: rgba(202, 202, 202, 0.199) 0px 8px 24px;
  }
</style>
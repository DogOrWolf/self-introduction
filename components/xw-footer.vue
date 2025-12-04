<template lang="html">
  <!-- footer start-->
  <div class="footer">
    <div class="beian">
      <span>京ICP证 京xx-xxxxx</span>
      <span>京公网安备 xxxxxx</span>
      <span>京ICP备xxxxxxx号-1</span>
    </div>
  </div>
  <!-- footer end-->
</template>

<script>
export default {
  name: "xwFooter",
  data: () => ({}),
  methods: {}
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: .32rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  color: #fff;
  opacity: .52;
  overflow: hidden;

  .beian{
    display: flex;
    height: 100%;
    justify-content: center;
    margin: 0 auto;
    align-items: center;

    span{
      font-size: 12px;
      color: #444;
    }
  }
}
</style>

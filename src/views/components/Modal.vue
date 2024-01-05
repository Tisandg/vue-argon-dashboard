<template>
  <transition name="modal">
    <div class="modal-mask" id="modalActions" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header"></slot>
              <hr class="hr hr-blurry" />
            </div>

            <div class="modal-body">
              <slot name="body"></slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </transition>
</template>
<script>
export default{
  props:{
    close: {type: Function}
  }
}
</script>
<style>

.modal-header > h1 h2 h3 h4 h5 h6{
  margin: 0;
}
.modal-header{
  flex-direction: column;
}

.modal-header > hr{
  margin: 0;
  width: 100%;
}

.modal-dialog{
  height: 100%;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: flex;
  vertical-align: middle;
  height: 100%;
  justify-content: center;
}

.modal-container {
  min-width: 40rem;
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 h2 h3 h4 h5 h6 {
  /* margin-top: 0; */
  color: var(--main-color);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
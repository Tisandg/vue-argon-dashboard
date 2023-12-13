<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :id="id"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        :placeholder="placeholder"
        :isRequired="isRequired"
        :success="success"
        :error="error"
      />
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { defineProps, defineEmits } from 'vue';

defineProps(['value'])
defineEmits(['update:value'])

export default {
  name: "argon-input",
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    value: String,
    placeholder: String,
    type: String,
    isRequired: Boolean,
  },
  methods: {
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      isValidValue = valid ? `${valid}` : "invalid";

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
};
</script>

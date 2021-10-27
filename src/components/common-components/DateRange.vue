<template>
  <label class="pad-label ls" for="start_date">
    <strong>Start:</strong>
  </label>
  <div class="s-i">
    <input
      name="start_date"
      type="date"
      v-model="startDate"
      @change="$emit('dateRangeChange', emitRange())"
    />
  </div>
  <label class="pad-label mr-l le" for="end_date">
    <strong>End:</strong>
  </label>
  <div class="e-i">
    <input
      name="end_date"
      type="date"
      v-model="endDate"
      @change="$emit('dateRangeChange', emitRange())"
    />
    <span v-if="dateValidation" class="form-error">{{dateValidation}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DateRange',
  emits: ['dateRangeChange'],
  data() {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return {
      startDate: dateStr,
      endDate: dateStr,
    };
  },
  computed: {
    dateValidation: function(): string | null {
      if(this.startDate !== undefined && this.endDate !== undefined && 
        this.startDate !=='' && this.endDate !== '' &&
        Date.parse(this.startDate) <= Date.parse(this.endDate)
      ){
        return null;
      }
      return 'invalid date range';
    },
  },
  methods: {
    emitRange() {
      if (this.dateValidation === null) {
        return {
          startDate: this.startDate,
          endDate: this.endDate,
        }
      }
      return null
    },
  },
});
</script>
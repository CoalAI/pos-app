<template>
    <div id="header-section" style="display: none;">
        <div>
          <img class="img-responsive" :src="logoimg ? logoimg : src_img" alt="Rohi">
        </div>
        <div class="company-info">
          <p class="mb-5 pb-5" style="font-size: 16px;"><strong>{{userdata.company.company_name}}</strong></p>
          <p class="text-center">{{userdata.company.address}}</p>
          <p class="text-center">{{userdata.company.contact_number}}</p>
        </div>
      </div>
      <div id="date-section" class="mb-5 pt-5" style="display: none;">
        <p class="text-center">{{currentTime()}}</p>
        <p class="text-center">{{currentDate()}}</p>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { getCurrentDate, getCurrentTime } from '@/utils/date_func';

export default defineComponent({
  name: 'PrintHeader',
  data () {
    return{
      src_img: require('@/assets/DefoultLogoAvatar-01.png'),
    }
  },
  computed: {
    ...mapGetters({
      userdata: 'getUser',
      logoimg: 'getLogoImg',
    }),
  },
  methods: {
    currentDate: getCurrentDate,
    currentTime: getCurrentTime,
  }
})
</script>
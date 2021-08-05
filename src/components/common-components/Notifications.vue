<template>
  <div id="notification">
    <div class="diff-shadow">
      <h2>Notification (To be implemented)</h2>
      <ul id="messages">
        <li v-for="(message, index) in messages" :key="message.id">{{index}}</li>
      </ul>
      <Paginator :count="notificationsCount" @pageChange="changePage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ActionTypes} from '@/store/modules/auth/actions'
import {mapActions, mapGetters} from 'vuex';

import Paginator from './Paginator.vue';


export default defineComponent({
  components: {
    Paginator,
  },
  data() {
    return {
      notificationsCount: 10,
    }
  },
  computed:{
    ...mapGetters({
      user: 'getUser',
      messages: 'getNotifications',
    })
  },
  methods:{
    changePage: async function (pageNo: number) {
      // TODO: Call notifiactions api for next page
      console.log(pageNo)
    },

    ...mapActions({
      userdata: ActionTypes.USER_DATA
    })
  },
  beforeMount: async function(){
    await this.userdata();
    //this.$socket.emit('client_info', {id: this.user.id, company: this.user.company.id});
  }
})
</script>

<style lang="scss" scoped>
#notification {
  padding-left: 15%;
  padding-right: 15%;
  margin-top: 3%;
}
body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
#form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
#input:focus { outline: none; }
#form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

#messages { list-style-type: none; margin: 0; padding: 0; }
#messages > li { padding: 0.5rem 1rem; }
#messages > li:nth-child(odd) { background: #efefef; }

</style>

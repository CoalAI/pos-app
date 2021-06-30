<template>
    <div class="pagination">
        <a href="#" @click="moveLeft">&laquo;</a>
        <span v-for="p in pageNo_list" :key="p">
            <a :class="p===selected?'active':''" href="#" @click="pageSelected(p)">{{p}}</a>
        </span>
        <a href="#" @click="moveRight">&raquo;</a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        count: {
            default:20
        },
    },
    data(){
        return {
            records_per_page : 10,
            selected: 1,
            // total_pages: 59,
            list_max: 5,
            offset: 0,
        }
    },
    computed: {
        pageNo_list: function() {
            const pages: number[] = []
            for(let i=this.offset;i<this.end;++i){
                pages.push(i+1);
            }
            return pages;

        },
        end: function(): number {
            const new_end = this.offset + this.list_max
            return new_end >= this.total_pages? this.total_pages : new_end
        },
        total_pages(): number {
            return this.count/this.records_per_page;
        }
    },
    methods: {
        moveRight: function(){
            if(this.end < this.total_pages){
                this.offset = this.end;
            }
            console.log(this.offset);
        },
        moveLeft: function(){
            if(this.offset > 0){
                this.offset = this.offset - this.list_max;
            }
            console.log(this.offset);
        },
        pageSelected: function(page: number) {
            this.selected = page;
            this.$emit('pageChange', page);
        }
    },
    
    mounted: function(){
        console.log(this.count);
        debugger
    },

})
</script>


<style lang="scss" scoped>
    .pagination {
        display: flex;
        justify-content: flex-end;
    }

    .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid #ddd;
    }

    .pagination a.active {
    background-color: $primary-color;
    color: white;
    border: 1px solid $primary-color;
    }

    .pagination a:hover:not(.active) {background-color: #ddd;}

    .pagination a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    }

    .pagination a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    }

</style>
<template>
    <div class="pagination">
        <a href="#" @click="moveLeft"><strong>&lt;&lt;</strong></a>
        <a href="#" @click="prev"><strong>&lt;</strong></a>
        <span v-for="p in pageNo_list" :key="p">
            <a :class="p===selected?'active':''" href="#" @click="pageSelected(p)">{{p}}</a>
        </span>
        <a href="#" @click="next"><strong>&gt;</strong></a>
        <a href="#" @click="moveRight"><strong>&gt;&gt;</strong></a>
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
            records_per_page : 30,
            selected: 1,
            // total_pages: 5,
            list_max: 5,
            offset: 1,
        }
    },
    computed: {
        pageNo_list: function() {
            const pages: number[] = []
            for(let i=this.offset;i<this.end;++i){
                pages.push(i);
            }
            return pages;

        },
        end: function(): number {
            const new_end = this.offset + this.list_max
            return new_end >= this.total_pages? this.total_pages + 1 : new_end
        },
        start: function(): number {
            const new_start = this.offset - this.list_max
            return new_start < 1 ? 1 : new_start
        },
        total_pages(): number {
            return this.count/this.records_per_page;
        }
    },
    methods: {
        moveRight: function(reset=true){
            if(this.end < this.total_pages){
                this.offset = this.end;
            }
            if(reset)
                this.selected=this.offset;
        },
        moveLeft: function(reset=true){
            if(this.offset > 1){
                this.offset = this.start;
            }
            if(reset)
                this.selected=this.offset;
        },
        pageSelected: function(page: number) {
            this.selected = page;
        },
        next: function(){
            if (this.selected+1<this.end){
                this.selected=this.selected+1;
            }else {
                this.moveRight();
            }
        },
        prev: function(){
            if(this.selected>1){
                if (this.offset===this.selected){
                    this.moveLeft(false);
                }
                this.selected--;
            }
      
        }
    },
    watch: {
        selected: function(){
            this.$emit('pageChange', this.selected);
        }
    },
})
</script>


<style lang="scss" scoped>
    .pagination {
        display: flex;
        justify-content: center;
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
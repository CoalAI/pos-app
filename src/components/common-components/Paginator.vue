<template>
    <div class="pagination">
        <a href="#" @click="moveLeft"><strong>&lt;&lt;</strong></a>
        <a href="#" @click="prev"><strong>&lt;</strong></a>
        <span class="asp" v-for="p in pageNo_list" :key="p" >
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
        background-color:#0f2634;
        position:relative;
        width:25%;
        border-radius:35px;
        margin-left:325px;
    }

    .pagination a {
        cursor:pointer;
        color: #0f2634;
        float: left;
        padding: 6px 12px;
        margin:2% 1%;
        text-decoration: none;
        border: 1px solid #ddd;
        border-radius:50%;
        background-color:white;
        width:35px;
        height: 35px;
        font-family:seg;
        padding:4px 0px 0px 8px;
    }

    .pagination a.active {
    background-color: $primary-color;
    color: white;
    border: 1px solid $primary-color;
    }

    .pagination a:hover:not(.active) {background-color: none;}
    .pagination span {
        margin-top:7px;
    }
    .asp a{
        border:1px solid white !important;
        background-color: #0f2634 !important;
        padding:5px 0px 0px 12px !important;
    }
    .pagination a:first-child {
        border-radius:50%;
        background-color: #e53d2a;
        color:white;
        border:none;
        float:left;
        padding:4px 0px 0px 8px;
    }
    .pagination a:last-child {
        border-radius:50%;
        background-color: #e53d2a;
        color:white;
        border:none;
        float:right;
        padding:4px 0px 0px 8px;
    }
    .pagination strong{
        font-size:18px;
        font-family:seg;
    }
    
</style>
<template>
    <div class="pagination">
        <ul>
            <!-- <li><a href="#" @click="moveLeft">&lt;&lt;</a></li> -->
            <li><a href="#" @click="prev">&lt;</a></li>
            <li :class="p===selected?'active':''" v-for="p in pageNo_list" :key="p">
                <a href="#" @click="pageSelected(p)">{{p}}</a>
            </li>
            <li><a href="#" @click="next">&gt;</a></li>
            <!-- <li><a href="#" @click="moveRight">&gt;&gt;</a></li> -->
        </ul>
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
    data() {
        const pageSize = process.env.VUE_APP_PAGE_SIZE as number || 30;
        return {
            records_per_page : pageSize,
            selected: 1,
            // total_pages: 5,
            list_max: 10,
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
        // position:relative;
        // width:25%;
        // border-radius:35px;
        // margin-left:325px;
    }
    // ab_css
    .pagination > ul{
        display: flex;
        list-style-type: none;
        background-color:#0f2634;
        padding: 3px 2px;
        border-radius: 20px;
    }

    .pagination > ul > li{
        background-color: white;
        border-radius: 50%;
        margin: 0 2px;
        width: 25px;
        height: 25px;
    }
    .pagination > ul > li:first-child{
        background-color: #e73b2a;
    }
    .pagination > ul > li:last-child{
        background-color: #e73b2a;
    }

    .pagination > ul > li a{
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        // font-weight: 500;
        display: inline-block;
        width: 100%;
    }
    .pagination > ul > li > a{
        color: #0f2634;
    }
    .pagination > ul > li:first-child > a{
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
    .pagination > ul > li:last-child > a{
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
    
    .pagination li:hover {
        border: 1px solid #e73b2a;
    }

    .pagination li.active {
        background-color: transparent;
        border: 1px solid white; 
    }
    .pagination li.active > a{
        color: white;
        
    }

    // .pagination a:hover:not(.active) {background-color: none;}
    // .pagination span {
    //     margin-top:7px;
    // }
    // .asp a{
    //     border:1px solid white !important;
    //     background-color: #0f2634 !important;
    //     padding:5px 0px 0px 12px !important;
    // }
    // .pagination a:first-child {
    //     border-radius:50%;
    //     background-color: #e53d2a;
    //     color:white;
    //     border:none;
    //     float:left;
    //     padding:4px 0px 0px 8px;
    // }
    // .pagination a:last-child {
    //     border-radius:50%;
    //     background-color: #e53d2a;
    //     color:white;
    //     border:none;
    //     float:right;
    //     padding:4px 0px 0px 8px;
    // }
    // .pagination strong{
    //     font-size:18px;
    //     font-family:seg;
    // }
    
</style>
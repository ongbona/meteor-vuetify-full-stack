<template>
    <div>
        <h1><center>Report</center></h1>


    </div>
</template>

<script>
export default {
    mounted(){
        this.getReport()
    },
    methods:{
        getReport(){
            Meteor.call('findInvoice',(error,result)=>{
                if(!error){
                    console.log(result)
                }
            })
        }
    }
}
</script>

<style>

</style>

<template>
<div>
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1">
       
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.price }}</td>
            <td>{{ props.item.cost }}</td>
            <td>{{ props.item.memo }}</td>
            <td>{{ props.item.qty }}</td>
            <td>
                <v-btn
                    color="info"
                    flat
                    round 
                     @click="btnEdit( props)">Edit</v-btn>
                <v-btn
                    color="red"
                    flat
                    round
                    @click="btnDelete( props.item._id)">Delete</v-btn>
            </td>

        </template>
    </v-data-table>
</div>
</template>

<script>
export default {
    props:['items'],
    data() {
        return {
            headers: [{
                    text: 'Name',
                    align: 'left',
                    sortable: true,
                    value: 'name'
                },
                {
                    text: 'Price',
                    align: 'left',
                    sortable: true,
                    value: 'price'
                },
                {
                    text: 'Cost',
                    align: 'left',
                    sortable: true,
                    value: 'cost'
                },
                {
                    text: 'Memo',
                    align: 'left',
                    sortable: true,
                    value: 'memo'
                },
                {
                    text: 'Qty',
                    align: 'left',
                    sortable: true,
                    value: 'qty'
                },

            ],
        
        }
    },
   
    methods: {
        btnEdit(val){
    ;
            this.$emit('getForm',val)
      
            
        },
        btnDelete(_id) {
            Meteor.call('removeItem', _id, (error, result) => {
                if (result) {
                    this.getItemData();
                    alert('Deleted !')
                }
            })
        },
        getItemData() {
            Meteor.call('findItem', (error, result) => {
                if (result) {
                    this.items = result;
                    console.log(result)
                }
            })
        }
    }
}
</script>

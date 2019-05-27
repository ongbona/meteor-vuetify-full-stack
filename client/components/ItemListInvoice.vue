<template>
<div>
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1">

        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.price }}</td>
            <td>{{ props.item.qty }}</td>
            <td>{{ props.item.amount }} $</td>

            <td>
                <v-btn
                    color="info"
                    flat
                    round
                    @click="btnEdit(props)">Edit</v-btn>
                <v-btn
                    color="red"
                    flat
                    round
                    @click="btnDelete( props.index)">Delete</v-btn>
            </td>

        </template>
    </v-data-table>
</div>
</template>

<script>
export default {
    props: ['items'],
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
                    text: 'Qty',
                    align: 'left',
                    sortable: true,
                    value: 'qty'
                },
                {
                    text: 'Amount',
                    align: 'left',
                    sortable: true,
                    value: 'amount'
                },

            ],

        }
    },

    methods: {
        btnEdit(val) {
            this.$emit('getForm', val)

        },
        btnDelete(val) {
            console.log(val)
            this.items.splice(1,val)
        },
        getItemData() {

        }
    }
}
</script>

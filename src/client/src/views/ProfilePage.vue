<template>
    <div>
        {{ singleUser }}
    </div>
</template>

<script>
import singleUser from '@/graphql/query/user.js';

export default {
    name: 'ProfilePage',
    data() {
        return {
            singleUser: null,
        };
    },
    created() {
        if (!localStorage.getItem('auth-token')) {
            this.$router.push('/');
        } else {
            this.getSingleUser();
        }
    },
    watch: {
        '$route': 'getSingleUser'
    },
    methods: {
        async getSingleUser() {
           const user = await  this.$apollo.query({
                query: singleUser,
                variables: {
                    id: this.$route.params.id
                }
            });
            this.singleUser = user.data.singleUser;
        }
    },
}
</script>

<style>

</style>


<template>
    <div>
        <sidenav></sidenav>
    </div>    
</template>

<script>
import SideNav from '../components/SideNav'

export default {
    name: 'Room',
    components: {
        'sidenav': SideNav
    },
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

</style>

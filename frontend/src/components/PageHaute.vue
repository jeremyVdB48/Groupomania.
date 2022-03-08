 <!-- header du site -->

<template>
    <div class="container-fluid col-md-12 text-center text-white p-5 accueil ">

        <div><img class="rounded-circle m-2" src="../assets/icon-above-font.png" alt="logo de l'entreprise Groupomania"><span class=" h1 groupomania ">GROUPOMANIA</span><span class=" h1 point">.</span></div>
               
    </div>

</template>

<script>
export default {
   name: "PageHaute"
}
</script>

<style scoped>

.accueil{
    background-color: #091f43;
    border: 5px solid grey;
  
}
img{
height: 150px;
border: 2px solid #d1515a;
}
.point{
    color: #d1515a;
}
</style>
<!-- création du FOOTER de mon site   -->

<template>
   
        <footer>
            <div class="container-fluid mt-5 pt-2 bg-dark text-white">
                <div class="row">
                    <div class="col-sm-6 col-md-6 item text-center">
                        <h3>Retrouvez-nous</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                   
                    <div class="col-md-6 item text">
                        <h3>Groupomania.</h3>
                        <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
                            plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
                                300 il y a 3 ans.</p>
                    </div>
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright mt-2 text-center">Groupomania © 2022</p>
            </div>
        </footer>

</template>

<script>
export default {
   name : "BasDePage"
}
</script>


<style scoped>
    .page-footer{
        background-color: #afafaf;
    }
</style>
<template>
  <div class="Contenedor">
    <div class="wSite">
      <a href="/" class="fLeft LinkLogo">
        <img src="../assets/Logo_ML@2x.png.png" alt="Logo ML" class="LogoML" width="54px" height="36px">
      </a> 
      <div class="BotonLupa fRigth" @click="ClickBuscar()"></div>
      <input ref="CajaBusqueda" type="text" class="CajaBusqueda fRigth" placeholder="Nunca dejes de buscar" id="CajaBusqueda"
       autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" aria-label="Ingresá lo que quieras encontrar"
       v-model="TextoBuscado"
       v-on:keyup.13="ClickBuscar()"
       >
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            TextoBuscado: ""
        }
    },
    created(){
        this.TextoBuscado = this.$route.query.search;
    },
    mounted(){
      if(this.$route.path == "/"){
        this.$refs.CajaBusqueda.focus();
      }
    },
    methods: {
      ClickBuscar() {
        try {
          if(this.TextoBuscado == undefined){ 
            return; 
          }
          let _Texto = this.TextoBuscado.trim();
          if (_Texto.length < 2){
            alert("Ingresá un texto que contenga al menos 2 letras...");
            return;
          }
          
          _Texto = window.encodeURIComponent(_Texto);

          window.location.href = "/items?search=" + _Texto;
        } catch (error) {
            alert("Ingresá un texto válido...");
            console.log(error);
            return;
        }
      }
    }
}
</script>
<style lang="scss">
  $AnchoLogoML:54px;
  $AnchoLupa:42px;
  $EspacioEntreLogoYCajaBusqueda:26px;
  .Contenedor{
    background: $FondoAmarillo;
    height: $AltoHeader;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .LogoML{
    width: $AnchoLogoML; 
    height:36px;
  }
  .LinkLogo{
    width: $AnchoLogoML; 
    height:36px;
    margin-top: 1px;
  }
  .CajaBusqueda{ 
    font-size:16px;
    width: calc(100% - #{$AnchoLogoML} - #{$EspacioEntreLogoYCajaBusqueda} - #{$AnchoLupa}); 
    border:none; 
    border-radius: 2px;
    height:38px;
    line-height:38px;
    padding: 7px 15px;
    outline:0;
    color: #333;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D8D8D8;
  }
  .BotonLupa{
    background-color: #EEE;
    width:$AnchoLupa; 
    height:38px;
    background-image: url("~@/assets/ic_Search@2x.png");
    // background-size: 20px 20px;
    background-position: center center;
    background-repeat:  no-repeat;
    background-size: 20px 20px;
    cursor:pointer;
  }

  @media (max-width: $AnchoMobile) {
    $MargenesMobile:5px;
    .BotonLupa{
      margin-right: $MargenesMobile;
    }
    .LogoML{
      margin-left: $MargenesMobile;
    }
    
    .CajaBusqueda{ 
      width: calc(100% - #{$AnchoLogoML} - #{$EspacioEntreLogoYCajaBusqueda} - #{$AnchoLupa}- #{$MargenesMobile * 2}); 
    }
  }
</style>

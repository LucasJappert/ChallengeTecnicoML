<template>
  <div class="">
    <div class="container">
        <div class="wSite">
            <div class="containerProductos">
                <div v-for="(item, index) in RetornoApi.items" :key="index" class="containerProducto">
                    <a :href="/items/ + item.id" class="contenedorFoto">
                        <img :src="item.picture" :alt="'Foto ' + item.id" class="fotoProducto">
                    </a>
                    <div class="contenedorInfo">
                        <div class="Seccion1">
                            <div class="dFcentered">
                                <div class="Precio">{{item.price.currency}} {{new Intl.NumberFormat("de-ES").format(item.price.amount)}}</div>
                                <img v-show="item.free_shipping" src="../../assets/ic_shipping@2x.png" :alt="'Shipping ' + item.id" class="Shipping">
                            </div>
                            
                            <div class="City">{{item.address_state_name}}</div>
                        </div>
                        <a :href="/items/ + item.id" class="Seccion2" replace>
                        <h1 class="">{{item.title}}</h1>
                        </a>
                    </div>
                    <br>
                    <div v-if="index != RetornoApi.items.length - 1" class="breakFlex">
                        <div class="Separador"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    watchQuery: ['page'],
    watchQuery(newQuery, oldQuery) {
        // Only execute component methods if newQuery.search != oldQuery.search |
        return (newQuery.search != oldQuery.search);
    },
    key(route) {
        return route.fullPath
    },
    name: "ResultadosBusquedas",
    data(){
        return {
            TextoBuscado: "",
            RetornoApi: []
        }
    },
    head(query) {
        return {
        title: "Challenge Técnico | Búsqueda " + this.TextoBuscado,
        meta: [
            { name: 'keywords', content: this.Keywords()},
            { hid: 'og:title', name: 'og:title', content: "Challenge Técnico | Búsqueda " + this.TextoBuscado},
            // { hid: 'og:description', name: 'og:description', content: this.RetornoApi.item.title},
            { hid: 'og:url', name: 'og:url', content: "/items?search=" + this.TextoBuscado},
            // { hid: 'og:image', name: 'og:image', content: this.RetornoApi.item.picture},
        ]
        // meta: [
        //   {
        //     hid: 'description',
        //     name: 'description',
        //     content: "asdasdasdasdas asd sad sasd"
        //   }
        // ]
        }
    },
    async asyncData({ route }) {
        let _Retorno = {};
        await axios.get("http://localhost:2004/api/items?q=" + route.query.search)
        .then(function (response){
            let _Data = response.data;
            _Data.items = _Data.items.slice(0, 4);
            _Retorno = _Data;
        })
        .catch(function (e){
            console.log(e);
        });
        return { 
            RetornoApi: _Retorno,
            TextoBuscado: route.query.search
        };
    },
    created(){
    },
    methods: {
        Keywords() {
            var _Retorno = this.TextoBuscado;
            _Retorno += ", ¡ofertas black friday! ";
            _Retorno += ", Challenge tecnico ML ";
            return _Retorno;
        }
    },
}
</script>


<style lang="scss" scoped>
    $TamañoFoto: 180px;
    $TamañoFoto_M: 100px;
    .container{
        padding: 0 5px 5px 5px;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .containerProductos{
        margin-top:20px;
        border-radius:3px;
        overflow: hidden;
        box-sizing:border-box;
    }
    .containerProducto{
        width:100%;
        background: #FFF;
        display:flex;
        flex-wrap: wrap;
    }
    .Separador{
        width: calc(100% - #{$MargenRojo * 2});
        margin-left: $MargenRojo;
        height:1px;
        background: #EEE;
    }
    .contenedorFoto{
        width:$TamañoFoto;
        height:$TamañoFoto;
        padding:$MargenRojo;
        display:flex;
        align-items:center;
        justify-content:center;
        box-sizing:content-box;
    }
    .contenedorInfo{
        margin-top: $MargenRojo;
        padding: $MargenRojo 0;
        width: calc(100% - #{$TamañoFoto} - #{$MargenRojo * 2});
    }
    .contenedorInfo .Seccion1{
        width:100%;
        display: flex;
        justify-content: space-between;
        line-height:30px;
        height:30px;
    }
    .contenedorInfo .Seccion2{
        width:100%;
        display: flex;
        line-height:18px;
        height:18px;
        margin-top: $MargenVerde;
    }
    .contenedorInfo .Seccion2 h1{
        font-size:18px;
    }
    
    .fotoProducto{
        max-width:$TamañoFoto;
        max-height:$TamañoFoto;
        border-radius:4px;
    }
    .Precio{ 
        font-size:24px; 
        //font-family: 'NovaRegular';
    }
    .City{ 
        font-size:12px; 
        align-self: flex-end;
        line-height:20px;
        width:180px;
    }
    .Shipping{
        width:18px;
        height:18px;
        margin-left:10px;
    }

    
  @media (max-width: $AnchoMobile) {
    .fotoProducto{
        max-width: $TamañoFoto_M;
        max-height: $TamañoFoto_M;
    }
    
    .contenedorFoto{
        width:$TamañoFoto_M;
        height:$TamañoFoto_M;
        padding:$MargenRojo_M;
    }
    .contenedorInfo .Seccion2{
        margin-top: $MargenVerde_M;
        line-height:14px;
        height:14px;
    }
    .contenedorInfo .Seccion2 h1{
        font-size:14px;
    }
    .contenedorInfo{
        padding: $MargenRojo_M 5px $MargenRojo_M 0;;
        width: calc(100% - #{$TamañoFoto_M} - #{$MargenRojo_M * 2});
    }
    .Precio{ 
        font-size:20px; 
    }
    .City{ 
        width:110px;
    }
  }
</style>
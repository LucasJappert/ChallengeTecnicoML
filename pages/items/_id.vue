<template>
    <div class="">
        <div class="container">
            <div class="wSite" v-if="RetornoApi.item.categories">
                <pathSection :Categorias="this.NombresCategorias()" />
                <div class="containerFicha">
                    <div class="ContenedorFoto">
                        <img width="10" height="10" :src="RetornoApi.item.picture" :alt="RetornoApi.item.id" class="FotoProducto">
                    </div>
                    <div class="ContenedorInfo">
                        <div class="Condition">{{RetornoApi.item.condition}} - {{RetornoApi.item.sold_quantity}} vendidos</div>
                        <h1 class="Titulo">{{RetornoApi.item.title}}</h1>
                        <div class="Precio">
                            {{RetornoApi.item.price.currency}} {{new Intl.NumberFormat("de-ES").format(RetornoApi.item.price.amount)}}
                        </div>
                        <div class="BotonComprar">Comprar</div>
                    </div>
                    
                    <div class="ContenedorDescripcion">
                        <div class="w100 TituloDescripcion">Descripción del producto</div>
                        <div v-html="RetornoApi.item.description.replace(/(?:\r\n|\r|\n)/g, '<br />')" class="TextoDescripcion"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import pathSection from "../../components/pathSection";
export default {
    head() {
        return {
            title: "Challenge Técnico | " + this.RetornoApi.item.title,
            meta: [
                { name: 'keywords', content: this.Keywords()},
                { hid: 'og:title', name: 'og:title', content: this.RetornoApi.item.title},
                { hid: 'og:description', name: 'og:description', content: this.RetornoApi.item.title},
                { hid: 'og:url', name: 'og:url', content: "/items/" + this.RetornoApi.item.id},
                { hid: 'og:image', name: 'og:image', content: this.RetornoApi.item.picture},
            ]
        }
    },
    data(){
        return {
            IdProducto: "",
            RetornoApi: { },
            Categorias: []
        }
    },
    async asyncData({ route }) {
        try {
            let _Retorno = {
                IdProducto: "",
                RetornoApi: {}
            };
            await axios.get("http://localhost:2004/api/items/" + route.params.id)
            .then(function (response){
                _Retorno = response.data;
            })
            .catch(function (e){
                console.log(e);
            });

            return { 
                RetornoApi: _Retorno,
                IdProducto: route.params.id
            };
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        Keywords() {
            var _Retorno = this.RetornoApi.item.categories.map((cat) => cat.name).join(', ');
            _Retorno += ", ¡ofertas black friday! ";
            _Retorno += ", Challenge tecnico ML ";
            return _Retorno;
        },
        NombresCategorias() {
            var _Retorno = [];
            this.RetornoApi.item.categories.forEach(cat => {
                _Retorno.push(cat.name);
            });
            return _Retorno;
        }
    },
    components: {
        pathSection
    }
}
</script>

<style lang="scss" scoped>    
    $TamañoFoto: 680px;
    $TamañoFoto_M: 360px;
    .container{
        padding: 0 5px 5px 5px;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .SeccionPath{
        padding: $MargenRojo 0;
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
        flex-wrap: wrap;
        color:#666;
    }
    .containerFicha{
        background: #FFF;
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
        flex-wrap: wrap;
        border-radius: 2px;
    }
    .Categoria{
        display: flex;
        font-size:14px;
    }
    .Categoria h2{
        font-size:14px;
    }
    .PiquitoMayor{
        padding: 0 6px;
    }
    .ContenedorFoto{
        width:$TamañoFoto;
        height:$TamañoFoto;
        height: auto;
        // padding:$MargenRojo;
        display:flex;
        align-items:center;
        justify-content:center;
        box-sizing:content-box;
    }
    .FotoProducto{
        width:auto;
        height:auto;
        max-width:$TamañoFoto;
        max-height:$TamañoFoto;
        max-width: calc(100% - 40px);
        max-height: calc(100% - 40px);
        border-radius:4px;
    }
    .ContenedorInfo{
        margin-top: $MargenVerde;
        width: calc(100% - #{$TamañoFoto});
    }
    .Condition{
        font-size:14px;
        line-height:14px;
    }
    .Titulo{
        margin-top:$MargenRojo;
        width: calc(100% - #{$MargenVerde});
        // text-align: justify;
        font-size:24px;
        line-height:24px;
        // font-family: "NovaRegular";
    }
    .Precio{
        margin-top:$MargenVerde;
        font-size:46px;
        line-height: 46px;
    }
    .BotonComprar{
        margin-top: $MargenVerde;
        width: calc(100% - #{$MargenVerde});
        background: $FondoBotonComprar;
        color: #FFF;
        text-align: center;
        border-radius:2px;
        height: 40px;
        line-height: 40px;
        font-size:18px;
        cursor:pointer;
    }
    .ContenedorDescripcion{
        // margin-top: $MargenVerde;
        padding: $MargenVerde; 
        width: 100%;
    }
    .TituloDescripcion{
        font-size: 28px;
        line-height: 28px;
    }
    .TextoDescripcion{
        margin-top: $MargenVerde; 
        font-size: 16px;
        line-height: 16px;
    }

    $AnchoContenedorInfo_M: 300px;
    @media (min-width: ($ResolucionMinimaAceptada + $AnchoContenedorInfo_M)) and (max-width: $AnchoMobile){
        .ContenedorInfo{
            min-width: $AnchoContenedorInfo_M;
        }
        .ContenedorFoto{
            width: calc(100% - #{$AnchoContenedorInfo_M});
        }
    }

    @media (max-width: ($ResolucionMinimaAceptada + $AnchoContenedorInfo_M)){
        .ContenedorInfo{
            margin: $MargenVerde_M $MargenRojo_M 0 $MargenRojo_M;
            width: 100%;
        }
        .ContenedorDescripcion{
            margin-top: $MargenVerde_M;
            padding: $MargenRojo_M; 
            width: 100%;
        }
        .ContenedorFoto{
            width: 100%;
            height:$TamañoFoto_M - 32px;
        }
        .Titulo{
            margin-top:$MargenRojo_M;
            width: 100%;
        }
        .Precio{
            margin-top:$MargenVerde_M;
        }
        .BotonComprar{
            margin-top: $MargenVerde_M;
            width: 100%;
        }
        .SeccionPath{
            padding: $MargenRojo_M;
        }
        .TextoDescripcion{
            margin-top: $MargenVerde_M; 
        }
    }
</style>
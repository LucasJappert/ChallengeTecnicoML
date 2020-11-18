<template>
    <div class="SeccionPath">
        <div v-for="(item, index) in Categorias" :key="index" class="Categoria">
            <h2 :class="{ B: (index == Categorias.length - 1)}">
                {{item}}
            </h2>
            
            <div v-if="index != Categorias.length - 1">
                <div class="PiquitoMayor">
                    <svg width="6" height="8"><path fill="none" stroke="#666" d="M1 0l4 4-4 4"></path></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // data(){
    //     return {
    //         Categorias: [],
    //     }
    // },
    mounted() {
        //console.log(this.Categorias);
    },
    props: {
        Categorias: {
            type: Array,
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
    $AnchoContenedorInfo_M: 300px;
    .SeccionPath{
        padding: $MargenRojo 0;
        display: flex;
        flex-flow: row wrap;
        flex-direction: row;
        flex-wrap: wrap;
        color:#666;
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

    
    @media (max-width: ($ResolucionMinimaAceptada + $AnchoContenedorInfo_M)){
        .SeccionPath{
            padding: $MargenRojo_M;
        }
    }
</style>
<template>
    <master-layout pageTitle="Map">
        <capacitor-google-map id="map">    
        </capacitor-google-map>
    </master-layout>
</template>
<script>

import { GoogleMap } from '@capacitor/google-maps'
export default {
    methods:{
        async newMap(){
            const apiKey = 'AIzaSyCpxwLv8i7LHVxKVyAKaHFalzt_3B70wvw';

            const mapRef = document.getElementById('map');

            await GoogleMap.create({
                id : 'my-map',
                element: mapRef,
                apiKey: apiKey,

                config: {
                    center: {
                        lat:33.6,
                        lng: -117.9,
                    },

                    zoom: 8,
                }
            })
        }
    },

    created() {
        this.newMap()
    },
}
</script>

<style>
    capacitor-google-map{
        display: inline-block;
        width: 275px;
        height: 400px;
    }
    
</style>
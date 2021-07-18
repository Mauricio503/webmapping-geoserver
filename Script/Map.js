import 'ol/ol.css';
import {Map, View} from 'ol/';
import { Image as ImageLayer} from 'ol/layer';
import ImageWMS  from 'ol/source/ImageWMS';
import TitleLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Projection from 'ol/proj/Projection';
import TileLayer from 'ol/layer/Tile';

const serverUrl='http://localhost:8082/geoserver/wms';

const mapProjection=new Projection({
    code:'EPSG:28191',
    units:'m',
    axisOrientation: 'neu',
    global:false
});

const orthophotoSource=new TileWMS({
    url:serverUrl,
    params:{"LAYERS":"Treinamento:orthophoto","VERSION":"1.1.1",
        "FORMAT":"image/jpeg"}
});

const orthophotoLayer=new TileLayer({
    source:orthophotoSource,
    name:"Orthophoto"
});

const parcelsSource = new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Treinamento:Parcels","VERSION":"1.1.1",
     "FORMAT":"image/png"}
});

const buildingsLayers= new ImageLayer({
    source:parcelsSource,
    name:"Parcels"
});

const buildingsSource = new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Treinamento:Buildings","VERSION":"1.1.1",
     "FORMAT":"image/png"}
});

const parcelsLayers= new ImageLayer({
    source:buildingsSource,
    name:"Buildings"
});

const view = new View({
    extent:[165217.233,151185.7259,172973.3239,155713.6059],
    center:[168540,153370],
    zoom:0,
    projection:mapProjection
});

const map = new Map({
    target:"map",
    layers:[orthophotoLayer,parcelsLayers,buildingsLayers],
    view:view
});

$('#map').data('map',map);
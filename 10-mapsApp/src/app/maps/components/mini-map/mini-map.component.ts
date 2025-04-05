import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import Layer from 'ol/layer/Layer';

@Component({
  selector: 'maps-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  @Input() public coordinates : Coordinate = [0,0];
  @Input() public placeName   : string = "";
  @Input() public title       : string = "";
  @Input() public description? : string = "";

  private ZOOM: number = 13;
  private map!: Map;

  constructor() { }

  public ngAfterViewInit(): void {
    this.initializeMap()
  }

  private initializeMap(): void {
    const mapCoordinates = this.coordinates;
    // Crear el mapa estático
    this.map = new Map({
      target: this.placeName, // ID único para cada mapa
      layers: [
        new TileLayer({source: new OSM()}),
        this.createMarkerLayer(mapCoordinates) // Capa del marcador
      ],
      view: new View({
        center: mapCoordinates,
        zoom: this.ZOOM,
      }),
      controls: [],
    interactions: []
    });
  }

  private createMarkerLayer(coordinates: number[]): VectorLayer {
    const marker = new Feature({
      geometry: new Point(coordinates)
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: 'map-icon-marker.png',
          scale: 0.8
        })
      })
    );

    const vectorSource = new VectorSource({
      features: [marker]
    });

    return new VectorLayer({
      source: vectorSource
    });
  }

}

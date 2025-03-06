import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Map, MapBrowserEvent, Tile, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Rotate, Zoom, MousePosition } from 'ol/control';
import { Coordinate } from 'ol/coordinate'
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';


import { Geometry, Point } from 'ol/geom';
import Feature from 'ol/Feature';
import Text from 'ol/style/Text';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Translate from 'ol/interaction/Translate'; // Interacción para arrastrar marcadores
import BaseEvent from 'ol/events/Event';
import { VectorSourceEvent } from 'ol/source/Vector';

interface Marker {
  id         : number;
  name       : string;
  icon       : string;
  coordiante : Coordinate;
}

@Component({
  selector: 'app-markers-page',
  imports: [NgFor, NgIf],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})



export class MarkersPageComponent implements AfterViewInit {
  public map?: Map;
  public xy: Coordinate = [0,0]
  public zoom: number = 3;
  public listMarker: Marker[] = [];
  public inputMarkerEdit: Marker | undefined;


  private vectorSource = new VectorSource();
  private vectorLayer = new VectorLayer({ source: this.vectorSource });

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map-container',
      layers: [new TileLayer( {source: new OSM()} ), this.vectorLayer],
      view: new View({ center: this.xy, zoom: this.zoom }),
      controls: []
    })

    this.listMarker;

    this.map?.on('click', (event) =>{
      this.handleMapClick(event);
    })

    const translateInteraction = new Translate({
      layers: [this.vectorLayer], // Solo afecta a la capa de marcadores
      hitTolerance: 5 // Tolerancia para seleccionar marcadores
    });
    this.map.addInteraction(translateInteraction);

    this.vectorSource.on('addfeature', (ev: VectorSourceEvent) => {
      //const style = ev.feature?.getStyle() as Style;
      //console.log(style?.getText()?.getText());
      //console.log((feature.getGeometry() as Point).getCoordinates())
      const feature: Feature<Geometry> = ev.feature!;
      this.addListMarker(feature);
    })
  }

  private handleMapClick(event: MapBrowserEvent<any>): void {
    if ( event.originalEvent.ctrlKey ){
      const coordinate: Coordinate = event.coordinate;
      this.addMaker(coordinate);
    }
  }

  public showEditMarker(marker: Marker): void {
    this.inputMarkerEdit = marker;
  }

  public saveEditMarker(ev: KeyboardEvent): void {
    if (ev.key === 'Enter') {
      console.log(this.inputMarkerEdit);
      const value = (ev.target as HTMLInputElement).value;
      this.inputMarkerEdit!.name = value;
      this.uploadMaker(this.inputMarkerEdit!);
      delete this.inputMarkerEdit;
    }
  }

  private uploadMaker(marker: Marker): void {

    this.vectorSource.getFeatureById(marker.id)?.setStyle(this.createStyle(marker.name, 'map-icon-marker.png'));

    /* const feature: Feature<Geometry> = this.vectorSource.getFeatureById(marker.id)!;
    (feature.getStyle()! as Style).getText()!.setText(marker.name);
    console.log(feature);
    console.log(marker) */

    this.listMarker.forEach( (item) => {
      if (item.id === marker.id){
        console.log('lo encontro', marker)
        item.name = marker.name
      }
    } )
  }

  private addMaker(coordinate: Coordinate) {
    const marker = new Feature({
      geometry: new Point(coordinate)
    });

    const id: number = this.vectorSource.getRevision() + 1;

    marker.setStyle(
      this.createStyle(`${id} Mark`, 'map-icon-marker.png')
    );

    marker.setId(id);

    this.vectorSource.addFeature(marker);
  }
//'map-icon-marker.png'
  private createStyle(name: string, icon: string): Style {
    return new Style({
      image: new Icon({
        src: 'map-icon-marker.png',
        scale: 0.8
      }),
      text: new Text({
        text: name,
        offsetY: 20
      })
    })
  }

  private addListMarker(feature: Feature<Geometry>): void {
    const marker = this.featureToMarker(feature);
    this.listMarker.push(marker);
  }

  private featureToMarker(currentFeature: Feature<Geometry>): Marker {
    const style: Style = currentFeature.getStyle() as Style;
    const icon: Icon = style.getImage() as Icon;
    const text: Text = style.getText() as Text;
    const id = currentFeature.getId() as number;

    const marker: Marker = {
      name: text.getText()!.toString(),
      icon: icon.getSrc()!,
      coordiante: (currentFeature.getGeometry() as Point).getCoordinates(),
      id: id
    }
    return marker
  }
}

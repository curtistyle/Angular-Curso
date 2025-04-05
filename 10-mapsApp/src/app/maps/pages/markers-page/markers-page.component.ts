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
import { LocalStorageService } from '../../services/local-storage.service';

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

export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  public map?: Map;
  public xy: Coordinate = [0,0]
  public zoom: number = 3;
  public listMarker: Marker[] = [];
  public inputMarkerEdit: Marker | undefined;

  private vectorSource = new VectorSource();
  private vectorLayer = new VectorLayer({ source: this.vectorSource });
  private translateInteraction! : Translate;


  constructor( private localStorageService: LocalStorageService ) {

    this.localStorageService.loadMarkers().subscribe(
      { next: (features) => {
        this.vectorSource.addFeatures(features);

        features.forEach( value => this.addListMarker(value) )
      } }
    )
  }
  ngOnDestroy(): void {
    this.translateInteraction?.dispose()
    this.map?.dispose()
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map-container',
      layers: [new TileLayer( {source: new OSM()} ), this.vectorLayer],
      view: new View({ center: this.xy, zoom: this.zoom }),
      controls: []
    })

    this.map?.on('click', (event) =>{
      this.handleMapClick(event);
    })

    this.translateInteraction= new Translate({
      layers: [this.vectorLayer], // Solo afecta a la capa de marcadores
      hitTolerance: 5 // Tolerancia para seleccionar marcadores
    });
    this.map.addInteraction(this.translateInteraction);

    this.translateInteraction.on('translateend', (ev) => {
      this.localStorageService.saveMarkers(this.vectorSource.getFeatures()).subscribe({
        next: () => console.log('marcadores guardaddos en localStorage')
      })

      const current = ev.features.getArray()[0]

      this.listMarker.forEach( marker => {
        if ( marker.id === ev.features.getArray().at(0)?.getId() ){
          console.log(`${marker.id} coordinateEnd`, current)
          marker.coordiante = (current.getGeometry() as Point).getCoordinates();
        }
      })

      this.vectorSource.forEachFeature( feature => {
        console.log(feature.getId(), ' - ',(feature.getGeometry() as Point).getCoordinates())
      })
    })

    this.vectorSource.on('addfeature', (ev: VectorSourceEvent) => {
      const feature: Feature<Geometry> = ev.feature!;
      this.addListMarker(feature);
      this.localStorageService.saveMarkers(this.vectorSource.getFeatures()).subscribe({
        next: () => console.log('marcadores guardaddos en localStorage')
      });
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
    const currentMark = this.listMarker.filter( mark => mark.id === marker.id)[0]



    console.log('goToMark: ', currentMark.coordiante)
    this.goToMarker(currentMark.coordiante);
  }

  public saveEditMarker(ev: KeyboardEvent): void {
    if (ev.key === 'Enter') {
      console.log(this.inputMarkerEdit);
      const value = (ev.target as HTMLInputElement).value;
      this.inputMarkerEdit!.name = value;
      this.uploadMaker(this.inputMarkerEdit!);

      this.localStorageService.saveMarkers(this.vectorSource.getFeatures()).subscribe({
        next: () => console.log('marcadores guardaddos en localStorage')
      })

      delete this.inputMarkerEdit;
    }
  }

  private uploadMaker(marker: Marker): void {
    this.vectorSource.getFeatureById(marker.id)?.setStyle(this.createStyle(marker.name, 'map-icon-marker.png'));
    this.listMarker.forEach( (item) => {
      if (item.id === marker.id){
        item.name = marker.name
      }
    })
  }

  private addMaker(coordinate: Coordinate) {
    const marker = new Feature({
      geometry: new Point(coordinate)
    });

    const id: number = this.vectorSource.getFeatures().length + 1;

    marker.setStyle(
      this.createStyle(`${id} Mark`, 'map-icon-marker.png')
    );

    marker.setId(id);

    this.vectorSource.addFeature(marker);
  }

  private createStyle(name: string, icon: string): Style {
    return new Style({
      image: new Icon({
        src: 'map-icon-marker.png',
        scale: 0.8,
        anchor: [0.5, 1]
      }),
      text: new Text({
        text: name,
        offsetY: 10
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

  private goToMarker(coordinates: Coordinate): void {
    const view = this.map?.getView()

    view?.animate({
      center: coordinates,
      zoom: 13,
      duration: 1500
    })

  }

  public deleteMarker(id: number) {
    const feature = this.vectorSource.getFeatureById(id) as Feature<Geometry>;
    this.vectorSource.removeFeature(feature);

    this.listMarker = this.listMarker.filter( marker => marker.id !== id );

    this.localStorageService.saveMarkers(this.vectorSource.getFeatures()).subscribe({
      next: () => console.log('marcadores guardaddos en localStorage')
    });
  }

}

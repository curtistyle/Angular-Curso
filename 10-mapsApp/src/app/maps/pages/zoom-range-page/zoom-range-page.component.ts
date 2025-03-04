import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Map, Tile, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Rotate, Zoom, MousePosition } from 'ol/control';
import { Coordinate } from 'ol/coordinate'
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-zoom-range-page',
  imports: [DecimalPipe],
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  public map?: Map;
  public zoom: number = 3;
  public xy: Coordinate = [0,0]
  public xyMouse: any;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map-container',
      layers: [new TileLayer( {source: new OSM()} )],
      view: new View({ center: this.xy, zoom: this.zoom }),
      controls: []
    })
    // Establecemos el zoom minimo y el maximo
    this.map.getView().setMinZoom(3);
    this.map.getView().setMaxZoom(12);

    this.map.addControl(new MousePosition({ target: "coordinates-info" }))

    this.mapListener();
  }

  public mapListener(): void {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.getView().on('change:resolution', (ev) =>{
    this.zoom = this._handleZoomChange();
    })
  }

  private _handleZoomChange = () =>
    this.map!.getView().getZoom()?.valueOf() ?? this.zoom;

  public zoomIn(): void {
    this.map?.getView().setZoom(this.zoom + 0.5)
  }

  public zoomOut(): void {
    this.map?.getView().setZoom(this.zoom - 0.5)
  }

  public zoomChange(value: string): void{
    this.map?.getView().setZoom(Number(value));
  }

  public ngOnDestroy(): void {
    this.map?.dispose()
    console.log("destroy zoom range")
  }
}

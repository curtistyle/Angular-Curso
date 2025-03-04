import { Component, OnDestroy, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Rotate, Zoom, MousePosition } from 'ol/control';

@Component({
  imports: [],
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, OnDestroy{
  public map!: Map;

  public ngOnInit(): void {
    this.initializeMap();
  }

  public initializeMap(): void {
    this.map = new Map({
      target: 'map-container',
      layers: [new TileLayer({ source: new OSM() })],
      view  : new View({ center: [0, 0], zoom: 2 }),
      controls: []
    })

    /* controles del zoom */
    this.map.addControl(
      new Zoom({
        target: 'zoom-control-container'
      })
    )
    /* controles de rotacion */
    this.map.addControl(
      new Rotate({
        target: 'rotate-control-container',
        autoHide: true
      })
    )
    this.map.addControl(
      new MousePosition({
        target: 'mouse-position-control-container',

      })
    )
  }
  ngOnDestroy(): void {
    this.map?.dispose()
    console.log("destroy full screen")
  }
}

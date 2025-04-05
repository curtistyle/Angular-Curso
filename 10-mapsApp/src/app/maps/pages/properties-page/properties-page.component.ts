import { Component } from '@angular/core';
import { MiniMapComponent } from "../../components/mini-map/mini-map.component";
import { LocalStorageService } from '../../services/local-storage.service';
import { Coordinate } from 'ol/coordinate';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import { Point } from 'ol/geom';
import { Style } from 'ol/style';
import { NgFor } from '@angular/common';

interface Propertie {
  coordinate  : Coordinate,
  placeName   : string,
  title       : string,
  description? : string
}

@Component({
  selector: 'app-properties-page',
  imports: [MiniMapComponent, NgFor],
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {
  public properties: Propertie[] = []

  constructor( localStorageService:LocalStorageService ) {
    localStorageService.loadMarkers().subscribe({
      next: (features) => {
        features.forEach( (feature) => {
          const prop = this.featureToPropertie(feature);
          console.log(prop)
          this.properties.push( prop )

        } )
       }
    })

  }

  private featureToPropertie(feature: Feature<Geometry>): Propertie {
    const coordinate: Coordinate = (feature.getGeometry() as Point).getCoordinates()
    const text: string = (feature.getStyle() as Style).getText()!.getText()!.toString();
    return {
      title: text,
      coordinate: coordinate,
      placeName: text.split(' ').join('-'),
      description: ""
    }
  }
}

import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Observable, of } from 'rxjs';
import Text from 'ol/style/Text';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly storageKey = 'map-markers';

  constructor() { }

  public saveMarkers( features: Feature<Geometry>[] ): Observable<void> {
    return new Observable( observer => {
      try {
        const markersData = features.map(feature => {
          const coordinate = (feature.getGeometry() as Point).getCoordinates();
          const name = (feature.getStyle() as Style).getText()?.getText()?.toString()
          const icon = ((feature.getStyle() as Style).getImage() as Icon).getSrc()
          return {
            coordinates: coordinate,
            name: name,
            icon: icon,
            id: feature.getId()
          }
        }).filter(marker => marker !== null);
        localStorage.setItem(this.storageKey, JSON.stringify(markersData));
        observer.next(); // Notificar que la operación fue exitosa
        observer.complete();
      } catch (er) {
        console.error('Error al guardar marcadores en localStore',er);
      }
    })
  }

  public loadMarkers(): Observable<Feature<Geometry>[]>   {
    return new Observable( observer => {
      try {
        const markersData = localStorage.getItem(this.storageKey);

        if (!markersData) {
          observer.next([])
          observer.complete()
          return;
        }

        const parseData: {
          coordinates: [],
          name: string,
          icon: string,
          id: number
        }[] = JSON.parse(markersData);

        const features = parseData.map( (item) => {
          const marker =  new Feature<Geometry>(
              {
                geometry: new Point(item.coordinates),
              }
            )
          marker.setStyle(
            this.createStyle(item.name, item.icon)
          )

          marker.setId(item.id);

          return marker;
        } )

        observer.next(features);
        observer.complete();

      } catch (err) {
        console.error('Error al cargar el localStorage ', err)
      }
    } )

  }

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


  public clearLocalStorage(): void{
    localStorage.clear()
  }
}

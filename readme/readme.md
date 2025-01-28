# Angular

## Comandos Basicos
**Instalar AngularCLI:** Ejecutar esto como administrador.
```cmd
npm install -g @angular/cli
```

**Iniciar un proyecto nuevo:** dos formas:
```cmd
npm init @angular myApp
ng new my-app
```

## Angular CLI
*Command line interface*
Estos son unos de las comandos comunes para usarlos en Angular CLI.

### Comandos para obtener ayuda de cualquier subrogando
```
ng --help
ng generate --help
ng build --help
```

### Comandos para generar componentes en Angular
| Comando | Descripcion |
|---------|-------------|
| `ng g component [name]` <br> `ng g c [name]` | Genera un nuevo componente en el `[name]`, que puede ser tambien `[path/name]`. |
| `ng g directive [name]` <br> `ng g d [name]` | Crea una nueva directiva. |
| `ng g guard [name]` <br> `ng g g [name]` | Crea un nuevo guard proteccion de rutas. |
| `ng g interceptor [name]` | Crea un interceptor para observable. |
| `ng g module [name]` <br> `ng g m [name]` | Crea un modulo que en si, es un agrupador de diferentes componentes. |
| `ng g pipe [name]` <br> `ng g p [name]` | Crea una pipe que en si, es un transformador visual de la data. |
| `ng g service [name]` <br> `ng g s [name]` | Crea un servicio, que en si, permite compartir informacion entre la aplicacion |

### Banderas utiles a los comandos de generacion

| Bandera | Descripcion |
| ------- | ----------- |
| `ng g c --help` | Muestra la ayuda completa de todos los comandos disponibles |
| `ng g c [name] --dry-run` | Ejecuta el comando sin modificar ningun archivo. Util si se esta seguro de lo que el comando hara |
| `ng g c [name] --flat` | Crea los nuevos archivos en el nivel especificado sin crear un nuevo directorio |
| `ng g c [name] --inline-style` <br> `ng g c [name] -s` | Incluye los estilos en el mismo archivo controlador (.ts) |

## Template Syntax
Enlaza la propiedad `value`, al valor de lo que contenga `firstName`. *Puede ser cualquier expresion de JavaScript*
```html
    <input [value]="firstName">
```

Lo mismo se puede enlazar (bind) con muchos otras atributos de los elementos HTML y componentes personalizados.

```html
    <!--- Añade el "role" igual al valor de myAriaRole --->
    <div [attr.role]="myAriaRole"></div>

    <!--- Añade la clase extra-sparkle si es verdadera la expresion --->
    <div [class.extra-sparkle]="isDelightful"></div>

    <!--- Incrementa el ancho en pixeles igual al valor de mySize --->
    <div [style.width.px]="mySize"></div>

    <!--- Añade el listener click y dispara readRainbow --->
    <button (click)="readRainbow($event)"></button>

    <!--- Añade al DIV el atributo title con el valor de la expresion --->
    <div [title]="'Hello ' + ponyName">
```

Enlaza el valor de la expresion al valor que vemos dentro del parrafo:
```html
    <p>Hello {{ponyName}}</p>
```

Configura el enlace de datos **bidireccional**.
```html
    <my-cmp [(title)]="name">
```

Que seria el equivalente a: 
```html
    <my-cmp
        [title]="name"
        (titleChange)="name=$event">
```

Plantilla inscrustadas
```html
    <p *myUnless="myExpression">
    ...  
    </p>
```

Lo que seria equivalente a:
```html
    <p *myUnless="myExpression">
        ...
    </p>
```

Uso de pipes:
```html
    <p>
        Nombre: {{ 'fernando' | uppercase }}
    </p>
```


Operador de navegacion segura:
```html
    <p>
        Employer: {{employer?.companyName}}
    </p>
```

Referencias locales en el html:
```html
<input #search type="text">

<video #movieplayer ...></video>
<button (click)="movieplayer.play()">
    Play
</button>
```


## Directivas incluidas
Las siguientes directivas vienen incluidas dentro del modulo **"CommonModule"** de `@angular/common`

`*ngIf`: Remueve una parte del DOM basado en la expresion `showSection`.
```html
    <section *ngIf="showSection"></section>
```

`*ngFor`: Convierte el `<li>` en un template, y lo usa para duplicarlo basado en la cantidad de elementos dentro de la lista:
```html
    <li *ngFor="let item of list"></li>
```

`ngSwitch`: Condicionalmente cambia el contenido del <div> por el template que cumpla la condicion:
```html
    <div [ngSwitch]="conditionExpression">
        <ng-template [ngSwitchCase]="case1Exp">
            ...
        </ng-template>
        <ng-template ngSwitchCase="case2LiteralString">
            ...
        </ng-template>
        <ng-template ngSwitchDefault>
            ...
        </ng-template>
    </div>
```

`ngClass`: Enlaza clases de css basado en un objeto o expresion.
```html
    <div [ngClass]="{'active'}: isActive,
                     'disabled': isDisabled">
```

`ngStyle`: Permite asignar estilos a los elementos html utilizando CSS.
```html
    <div [ngStyle]="{'property': 'value'}"></div>
    <div [ngStyle]="dynamicStyles()">
```

`FormsModules` de **@angular/forms**
<input [(ngModel)]="userName" />

### Decoradores de clase para compoenentes

`@input`: Define una propiedad que puede ser enviada desde el padre hacia el componente hijo.
```typescript
    @Input() myProperty;
```
Ejemplo:
```typescript
    <my-cmp [myProperty]="someExpression">
```

`@Output`: Define una salida del componente que el componente padre puede suscribirse para escuchar.
```typescript
    @Output() myEvent = new EventEmitter();
```
Ejemplo:
```html
    <my-cmp (myEvent)="someExpression">
```

`@HostBinding`: Enlaza el elemento anfrition (host) a la propiedad de la clase: *@angular/core*
```typescript
    @HostBinding('class.valid') is valid;
```

`@HostListener`: Se suscribe al evento click del anfitrion (host), opcionalmente se puede recibir el evento. *@angular/core*
```typescript
    @HostBinding('click', ['$event'])
        onClick(e) {...}
```

`@ViewChild` y `@ViewChildren`: Enlaza el resultado final de la vista del componente basado en el predicado a la propiedad de la clase (no es valido para directivas)
```typescript
    @ViewChild(myPredicate) myChildComponent;
    @ViewChildren(myPredicate) myChildComponent;
```

## Ciclo de vida - Lifecycle Hooks
Estos son los pasos de ejecucion cuando un componente o directiva entra en pantalla.

| Hook / Class Method | Description |
| ------------------- | ----------- |
| `constructor` | Se llama antes de cualquier ciclo de vida |
| `ngOnChanges` | Antes de cualquier cambio a una propiedad |
| `noOnInit` | Justo despues del constructor. |
| `ngDoCheck` | Se llama cada vez que una propiedad del componente o directiva es revisada. |
| `ngAfterContentInit` | Despues de ngOnInit, cuando el componente es inicializado. |
| `ngAfterContentChecked` | Se llama despues de cada revision del componente o directivas. |
| `ngAfterViewInit` | Despues del ngAfterContentInit |
| `ngAfterViewChecked` | Llamado despues de cada revision de las vistas del componente o directiva. |
| `ngOnDestroy` | Se llama justo antes de que el componente o directiva va a ser destruida. |

## Configuracion de rutas o Router
Este es un ejemplo de rutas comunes:

```typescript
    const routes: Rutes = [
        { path: '', component: HomeComponent },
        { path: 'path/:routeParam', component: ...},
        { path: '**', component: ... },
        { path: 'oldPath', redirectTo: '/staticPath' },
        { path: ..., compoenet: ...,
            data: { message: 'Custom' }
         }
    ]);

    const routing = RouterModule.forRoot(router);
```

En el HTML:
```html
    <route-outlet></roue-outle>
```

`LazzyLoad` Permite de manera perezosa, cargar un modulo. Esto significa cargarlo bajo demanda (cuando un usuario lo solicita) y luego queda en memoria.

```typescript
import { Routes } from '@angular/roue';

const routes: Routes = [
    {
        path: 'items',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
    }
];
```

`RouterLink` Diferentes anchor tags soportados para navegacion.
```html
    <a routerLink="/path">
    <a [routerLink]="[ '/path', routeParam ]">

    <a [routeLink]="[ '/path', { matrixParam: 'value' } ]">
    <a [routeLink]="[ '/path' ]" [queryParams]=" { page: 1 } ">
    <a [routeLink]="[ '/path' ]" fragment="anchor">
```

`RouteActiveLink`: Mostrar anchor tag con una clase si nos encontramos en la respectiva ruta.

## Proteccion de rutas

`CanActivateFn`: Una interfaz que nos permite definir una funcion para validar si una ruta se puede activar.

```typescript
    import {
        CanActiveFn,
        ActivatedRouteSnapshot, RouterStateSnapshot
    } from "@angular/route"

    function canActivateGuard: CanActivateFn =
        (
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ) => { ... }

    # Definicion de la ruta
    { path: ..., canActivate: [canActivateGuard] }
```

`CanDeactivateFn`: Interface para definir una funcion que permite indicar 
le a Angular si el usuario puede de una ruta, 
util si hay cambios pendientes de guardar por parte del client.

```typescript
    import {
        CanDeactivateFn, ActivatedRouteSnapshot,
        RouterStateSnapshot } from "@angular/router"

    function canDeactivateGuard: CanDeactivateFn<T> = 
        (
            component: T,
            route: ActivateRouteSnapshot,
            state: RouterStateSnapshot
        ) => { ... }

    # Definicion de la ruta
    { path: ..., canDeactivate: [canDeactivateGuard] }
```

El mismo concepto se puede aplicar a las siguientes funciones

| Funcion | Descripcion | 
| ------- | ----------- |
| `CanActivateChildFn` | El router determina si la ruta hija se puede activar |
| `Resolve` | El route determina si puede o no mostrar una ruta |
| `CanLoadFn` | El route determina si se puede cargar mediante lazy load un modulo |

La forma comun de proteccion de rutas en Angular es utilizar clases inyectables que implementan 
los metodos mencionados: `CanActivate`, `CanLoad`, `CanDeactivate`.

## Guards con clases

Debe de implementar la interfaz de `CanActivate` para que Angular lo considere un pipe 
para proteger una ruta a la hora de activarla.

```typescript
class UserToken {}
class Permissions {
    canActivate(): boolean {
        return true;
    }
}

@Injectable()
class CanActivateTeam implements CanActivate {
    constructor(private permissions: Permissions,
    private currentUser: UserToken) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|
    UrlTree>|boolean|UrlTree {
        return this.permissions.canActivate(this.currentUser, 
        route.params.id);
    }
}
```

Y se utiliza de la siguiente manera en la definicion de las rutas.

```typescript
    @NgModule({
        imports: [
            RouterModule.forRoot([
                {
                    path: 'team/:id',
                    component: TeamComponent,
                    # AQUI!!! <----
                    canActivate: [CanActivateTeam]
                }
            ])
        ],
        providers: [CanActivateTeam, UserToken, Permissions]
    })
    class AppModule {}
```

Pero tambien se puede definir en linea con la siguiente funcion:
```typescript
    @NgModule({
        imports: [
            RouterModule.forRoot([
                {
                    path: 'team/:id',
                    component: TeamComponent,
                    canActivate: [
                        (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
                    ]
                }
            ])
        ]
    })
    class AppModule {}
```

La clave de los Guards, es que deben retornar un valor Boolean si quieren dejar pasar la pedicion.
Tambien puede ser una promesa que resuelva un boolean o un observable que emita un boolean.

## Pipes

Este es el listado de los pipes propios de angular

| Pipe | Descripcion |
| ---- | ----------- |
| `DatePipe` | Realizar formateos a una fecha |
| `UpperCasePipe` | Capitaliza todos los textos |
| `LowerCasePipe` | Coloca en minuscula todo el texto |
| `CurrencyPipe` | Formatea el numero a un formato de moneda |
| `DecimalPipe` | Transforma un numero a un string con formato especificado |
| `PercentPipe` | Transforma el numero a un porcentaje string, formateado basado en las reglas locales |
| `AsyncPipe` | Espera el resultado de una tarea asincrona (Promise u Observable) e imprime la resolucion o emision |
| `I18nPluralPipe` | Es un mapa de valores para ayudar con la localizacion de palabras |
| `I18nSelectPipe` | Similar al anterior, pero para singulares |
| `JsonPipe` | Convierte un valor es una representacion con formato JSON |
| `KeyValuePipe` | Transforma un objeto o mapa, en un arreglo de pares de valores |
| `SlicePipe` | Crea un nuevo arreglo o string que contiene el subset (slice o corte) se los elementos |
| `TitleCasePipe` | Capilatiza cada palabra del string que este separado por espacios |

## RxJS

RxJS, es una libreria incluida en Angular para poder trabajar con observables y en si, la programacion 
reactiva.

Hay muchos operadores y funciones para generar observables que se usan en Angular, considere estudiar RxJS 
para poder reducir la cantidad de codigo de los observables y hacer el trabajo mas simple.






  import * as THREE from 'three';
  import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
   import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  //import {Object3d} from 'node_modules/three/src/core/Object3D.js';
  @Injectable({ providedIn: 'root' })
  export class EngineService implements OnDestroy {
    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private light: THREE.AmbientLight;
    private controls : OrbitControls;
    private sphere: THREE.Mesh;
    private keylight : THREE.DirectionalLight;
    private filllight : THREE.DirectionalLight;
    private backlight : THREE.DirectionalLight;
    private frameId: number = null;

    public constructor(private ngZone: NgZone) {}

    public ngOnDestroy(): void {
      if (this.frameId != null) {
        cancelAnimationFrame(this.frameId);
      }
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
     
      // The first step is to get the reference of the canvas element from our HTML document
      this.canvas = canvas.nativeElement;
      this.scene = new THREE.Scene();
      //this.scene.background = new THREE.Color( 0xff0000 );
      this.camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
      );
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,    // transparent background
        antialias: true // smooth edges
      });
      this.renderer.setClearColor( 0xffffff, 0);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial();
      this.sphere = new THREE.Mesh( geometry, material );
      this.camera.position.z = 3;
      const light = new THREE.DirectionalLight(0xcccccc, 1);

      light.position.set(5, 3, 5);
       this.scene.add(light);
     /* var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
      this.scene.add( ambientLight );
      var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
      this.camera.add(pointLight);
      this.scene.add(this.camera);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;

      this.keylight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%,75%)') , 1.0 );
      this.keylight.position.set(-100, 0, 100);
      this.filllight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%,75%)') , 0.75 );
      this.filllight.position.set(100, 0, 100);
      this.backlight = new THREE.DirectionalLight(0xffffff, 1.0 );
      this.backlight.position.set(-100, 0, 100).normalize();
*/

    /*  this.scene.add( this.keylight );
      this.scene.add( this.filllight );
      this.scene.add( this.backlight);
*/

      /*// soft white light
      this.light = new THREE.AmbientLight( 0x404040 );
      this.light.position.z = 10;
      this.scene.add(this.light);*/
    this.animate();
  /*
      let loader = new GLTFLoader();
    loader.load( 'assets/Earth/Earth.glb', function ( gltf ) {

    this.scene.add( gltf.scene );

  }, undefined, function ( error ) {

    //console.error( error );

  } );*/
     

    }

    public animate = () => {
      requestAnimationFrame(this.animate);
       this.renderer.render(this.scene, this.camera);
    
      // We have to run this outside angular zones,
      // because it could trigger heavy changeDetection cycles.
     /* this.ngZone.runOutsideAngular(() => {
        if (document.readyState !== 'loading') {
          this.render();
        } else {
          window.addEventListener('DOMContentLoaded', () => {
            this.render();
          });
        }

        window.addEventListener('resize', () => {
          this.resize();
        });
      });*/

    };


  /* public render(): void {
      this.frameId = requestAnimationFrame(() => {
        this.render();
      });
     /* Object3d.rotation()
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;*/
     

    public resize(): void {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      

      this.renderer.setSize( width, height );
    }
  }

import * as THREE from "three";
import video1 from './assets/4Kjd1.mp4'
import video2 from './assets/4K宇宙1.mp4'
import video3 from './assets/4K宇宙2.mp4'

// import image1 from './assets/image1.jpg'
// import image2 from './assets/image2.jpg'
// import image3 from './assets/image3.jpeg'
import {Texture} from "three";
import fragment from './glsl/fragment'
import vertex from './glsl/vertex'

export class ScrollScence {
    private _render: THREE.WebGLRenderer;

    private _sence: THREE.Scene;

    private _camera: THREE.PerspectiveCamera;

    private _plane?: THREE.Mesh;

    private _material?: THREE.ShaderMaterial;

    private _time: number = 0;

    private _speed: number = 0;

    private _position: number = 9;

    private _videos: Texture[];

    private _loader: THREE.TextureLoader = new THREE.TextureLoader();



    constructor(canvas: string) {
        // console.log(image1.length, image2.length, image3.length)
        const container = document.getElementById(canvas) as HTMLCanvasElement;

        this._sence = new THREE.Scene();

        this._render = new THREE.WebGLRenderer({canvas: container});

        this._render.setPixelRatio(window.devicePixelRatio);
        this._render.setSize(window.innerWidth, window.innerHeight);

        // container.appendChild(this._render.domElement);
        this._camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.001, 100
        );
        this._camera.position.set( 0, 0, 1 );
        this._videos = [
            loadVideoTexture(video1),
            loadVideoTexture(video2),
            loadVideoTexture(video3),

            // this._loader.load(image1, this.updateTextureOnResize),
            // this._loader.load(image2, this.updateTextureOnResize),
            // this._loader.load(image3, this.updateTextureOnResize),
        ];




    }


    public CreateScence(): void{

        this._material = new THREE.ShaderMaterial( {
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: 'f', value: this._time } as any,
                pixels: {type: 'v2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)} as any,
                accel: {type: 'v2', value: new THREE.Vector2(0.5,2)} as any,
                progress: {type: 'f', value: 0} as any,
                uvRate1: {
                    value: new THREE.Vector2(1,1)
                },
                texture1: {
                    value: this._videos[0]
                },
                texture2: {
                    value: this._videos[1]
                },
            },
            // wireframe: true,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        this._plane = new THREE.Mesh(new THREE.PlaneGeometry( 1,1, 1, 1 ), this._material);
        this._sence.add(this._plane);
        this.onResize();


    }

    public onResize = () =>{
        const w = window.innerWidth;
        const h = window.innerHeight;
        if(this._render){
            this._render.setSize( w, h );
        }

        if(this._camera){
            this._camera.aspect = w / h;
            let dist  = this._camera.position.z - this._plane!.position.z;
            let height = 1;
            this._camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));
        }

        if(this._material){
            this._material!.uniforms.uvRate1.value.y = h / w;
        }



        if(this._plane){
            this._plane!.scale.x = w/h;
        }

        if(this._camera){
            this._camera.updateProjectionMatrix();
        }



    }

    public render() : void{
        const comrender = () => {
            this._time = this._time+0.05;
            this._material!.uniforms.time.value = this._time;
            requestAnimationFrame(comrender);
            this._render.render(this._sence, this._camera);
        }
        comrender();

    }

    public onWheel = (event: WheelEvent) => {
        this._speed+=event.deltaY*0.0002;
    }

    public raf = () => {
        this._position += this._speed;
        this._speed *=0.7;


        let i = Math.round(this._position);
        let dif = i - this._position;

        this._position += dif*0.035;
        if(Math.abs(i - this._position)<0.001) {
            this._position = i;
        }


        this._material!.uniforms.progress.value = this._position;


        let curslide = (Math.floor(this._position) - 1 + this._videos.length)%this._videos.length;
        let nextslide = (((Math.floor(this._position) + 1)%this._videos.length -1) + this._videos.length)%this._videos.length;
        console.log(curslide,nextslide);
        this._material!.uniforms.texture1.value = this._videos[curslide];
        this._material!.uniforms.texture2.value = this._videos[nextslide];
        window.requestAnimationFrame(this.raf);
    }

    // public updateTextureOnResize = (texture: Texture) => {
    //
    // }

}

export function loadVideoTexture(src: string): THREE.VideoTexture{
    const video = document.createElement('video')
    video.muted = true
    video.loop = true
    video.autoplay = true
    video.src = src;

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    video.load();
    const play = video.play()
    if (play) {
        play.catch(() => undefined)
    }
    return texture;
}


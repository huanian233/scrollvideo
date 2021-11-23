import React from "react";

import { ScrollScence } from "./ScenceComponents"// uses above component in same directory

import "./App.css";

export class App extends React.Component{
  private _scence?: ScrollScence;
  private _canvasid: string = 'renderCanvas';
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this._scence = new ScrollScence( this._canvasid);
    this._scence.CreateScence();
    window.addEventListener('resize', this._scence.onResize);
    this._scence.render();
    window.addEventListener('wheel', this._scence.onWheel);
    this._scence.raf();


  }

  public render() {
    const id = this._canvasid;
    return <canvas id = {id}  />;
  }



}

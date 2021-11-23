import {Component} from "react";
import GitHubCorner from 'react-github-corner'

export default class ScrollTips extends Component {
    render (){
        return (<div
            style={{
                height: '100vh'
            }}
        >

            <div
            style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: '1em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'Quicksand, "Helvetica Neue", sans-serif',
                pointerEvents: 'none'
            }}
        >
            <h1
                style={{
                    fontSize: '3em',
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'
                }}
            >
                Scroll Video
            </h1>

            <p
                style={{
                    fontSize: '1.5em'
                }}
            >
                滑动鼠标滚轮
            </p>
        </div>
                <GitHubCorner
                    href='https://github.com/transitive-bullshit/react-fluid-gallery'
                    bannerColor='#70B7FD'
                />
        </div>
        )
    }
}

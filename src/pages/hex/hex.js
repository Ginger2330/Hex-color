import Taro, { Component, chooseImage, createCanvasContext, getSystemInfo, getImageInfo, canvasGetImageData, navigateTo, getApp, navigateBack, redirectTo } from '@tarojs/taro'
import { View, Canvas, Label, Text } from '@tarojs/components'
import './hex.scss'

export default class Hex extends Component {
    constructor (props) {
        super(props)
        this.state = {
          Height: 355,
          Width: 355,
          rgba: null,        }
    }

    componentWillMount () {
      let that = this
      chooseImage({
        count: 1,
        success(res) {
          const imageSrc = res.tempFilePaths[0]
          getSystemInfo({
            success(res) {
              const W = Number(res.windowWidth)*0.9;
              const H = W / 0.75;
              console.log(res.windowHeight)
              getImageInfo({
                src: imageSrc,
                success(res) {
                  const imageH = Number(res.height);
                  const imageW = Number(res.width);
                  const ratio = imageW / imageH;
                  if(ratio>0.75) {
                    that.setState({Height: W/ratio, Width: W})
                    const ctx = createCanvasContext('myCanvas')
                    ctx.drawImage(imageSrc, 0, 0, W, W/ratio)
                    ctx.draw()
                  }else{
                    that.setState({Height: H, Width: W})
                    const ctx = createCanvasContext('myCanvas')
                    ctx.drawImage(imageSrc, 0, 0, W, H)
                    ctx.draw()
                  }
                  //that.setState({imageH: res.height, imageW: res.width})
                }
              })
            }
          })
        }
      })
    }

    componentDidMount () { }

    componentWillUpdate () {}

    componentDidUpdate () {}

    shouldComponentUpdate () {}


    touch (e) {
      const that = this
      let pos = e.currentTarget
      let position = {
        x: pos.x - pos.offsetLeft,
        y: pos.y - pos.offsetTop
      }
      canvasGetImageData({
        canvasId: 'myCanvas',
        x: position.x,
        y: position.y,
        width: 1,
        height: 1,
        success(res) {
          //console.log(typeof res.data.join())
          that.setState({rgba: res.data.slice(0,3)})
        }
      })
    }
    toHex (rgba) {
      let hex=''
      if (rgba === null) {hex = null}
      else {
        for(let i=0;i<3;i++){
          hex += rgba[i].toString(16)
        }
      }
      return '#'+hex
    }
    toPageColor () {
      getApp().globalData.rgb = this.state.rgba
      navigateTo({url:'../color/color'})
    }
    changePhoto () {
      redirectTo({url:'hex'})
      // reDirect to this page
    }
    back () {
      navigateBack({delta: 1})
    }

    render () {
      let canvStyle = {
        height: this.state.Height + 'px',
        width: this.state.Width + 'px',
      }
      let hex = this.toHex(this.state.rgba)
      return (
        <View className='hex' style={{background:hex===null?'':hex}}>
          <View className='header' onClick={this.back}>🍉 Hex</View>
          <View className='container' style={canvStyle}>
            <Canvas canvasId='myCanvas' style={canvStyle} onClick={this.touch}></Canvas>
          </View>


          <View className='display'>
            <Label for='rgba' style={{'padding-right':'10px'}}>RGB:</Label>
            <Text id='rgba'>{this.state.rgba && this.state.rgba.join()}</Text>
          </View>
          <View className='display' style={{'margin-top': 0}}>
            <Label for='hex' style={{'padding-right':'10px'}}>HEX:</Label>
            <Text id='hex'>{hex}</Text>
          </View>
          <View className='display2' onClick={this.toPageColor}>推荐配色</View>
          <View className='display2' style={{margin:'10px'}} onClick={this.changePhoto}>换张图片</View>
        </View>
      )
    }
}

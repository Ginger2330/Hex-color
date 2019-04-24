import Taro, { Component, showToast, navigateTo } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showBut: false
    }
  }

  componentWillMount () {
    showToast({
      title: '点击任意位置',
      icon: 'success',
      duration: 2000
    })
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  showButton = () => {
    this.setState(preState =>({
      showBut: !preState.showBut
    }))
  }
  toHex = () => {
    navigateTo({
      url: '../hex/hex'
    })
  }
  toColor = () => {
    navigateTo({
      url: '../color/color'
    })
  }
  back () {
    showToast({
      title: '别走\nka ji ma ~',
      icon: 'none',
      duration: 1000
    })
  }

  render () {
    const anim = this.state.showBut?
    {
      top: '50%',
      width: '120px', 
      height: '120px', 
      'line-height': '120px', 
      background: '#fa1126'
    }:''
    
    return (
      <View className='index' onClick={this.showButton}>
        <View className='header'><View onClick={this.back}>🎨 HexColor</View></View>
        <View className='body'>
            <Button id='color' style={anim} onClick={this.toColor}>配色</Button>
            <Button id='hex' style={anim} onClick={this.toHex}>拾色</Button>
        </View>
        <View className='footer'></View>
      </View>
    )
  }
}

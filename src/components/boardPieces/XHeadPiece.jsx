import React, {Component} from 'react'

class XHeadPiece extends Component{
    constructor(props){
        super(props)
        // this.headClick=this.headClick.bind(this)
        this.headClick=this.headClick.bind(this)
    }
    headClick(){
        let xData = this.props.xData
        let letterValue = xData.value
        let clicked = xData.clicked
        let column = xData.column
        let index = this.props.index
        this.props.xHeadClick(letterValue,clicked,column,index)
       
    }
    colorChanger(){
        if (this.props.xData.clicked === 1){
            return 'head yellow'
        }else{
            return 'head'
        }
    }
    render(){
        //console.log(this.props.xData.value, "here is the value on xhead")
        return(
            <th className={this.colorChanger()} onClick={this.headClick} value={this.props.xData}>{this.props.xData.value}</th>
        )
    }
}
export default XHeadPiece;



// tableXHeadGenerator(xHeaders){
//     return(
//         xHeaders.map((xHeaderValue, index)=>{
//           this.setState({
//               xHeaderState: [...this.state.xHeaderState,{index:0}]
//           })
//         return <th className='head' value={xHeaderValue}>{xHeaderValue}</th>
//     }))
// }

// this.setState({
//     xHeaderState: [...this.state.xHeaderState,{index:0}]
// })
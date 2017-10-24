import React, {Component} from 'react'

class YHeadPiece extends Component{
    constructor(props){
        super(props)
        this.headClick=this.headClick.bind(this)
    }
    headClick(){
        let yData = this.props.yData
        let letterValue = yData.value
        let clicked = yData.clicked
        let row = yData.row
        let index = this.props.index
        //console.log(row,'this is in y header')
        this.props.yHeadClick(letterValue,clicked,row,index)
       
    }

    colorChanger(){
        if (this.props.yData.clicked === 1){
            return 'head yellow'
        }else{
            return 'head'
        }
    }
    render(){
        //console.log(this.props.yData.row, "here is the row on yhead")
        return(
            <th className={this.colorChanger()} onClick={this.headClick} value={this.props.yData}>{this.props.yData.value}</th>
        )
    }
}
export default YHeadPiece;
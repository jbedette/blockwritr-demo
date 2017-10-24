import React, { Component } from 'react';
import XHeadPiece from './boardPieces/XHeadPiece'
import YHeadPiece from './boardPieces/YHeadPiece'
import axios from 'axios'


//summary
// start: two strings come in at xWord and yWord
// step1: strings are split into arrays then put into header states arrays as objects with three values, value:letter, row:# or column:#, and clicked:0
// step2: board is built using these two words split into arrays, values are assigned by passing corresponding object values as props
// step3: a click grabs the values from the component head piece <==== where this works
// step4: from click function, column or row is passed into inputter <==== where the problem is somewhere
// -inputter shouldn't care if column or row is passed first
// -inputter passes values first into setInputOrder
//      -setInputOrder determines if the value is x or y (column or row), sets the inputOrder array in state to reflect that
//      -after setting to x or y, it only accepts new values from the set variable.
// -outputter is then called
//      -outputter outputs a string of concatted x's and y's
//      -outputter needs two values to fire because we only want to know intersections
//      -depending on which value was passed through setInputOrder, it takes either column or row from inputOrder and then a new value from
// 
class Board extends Component{
    constructor(){
        super();
        this.state={
            xWord:"me",
            yWord:"tin",
            headerStateLoaded:false,
            xHeaderState:null,
            yHeaderState:null,
            primaryInput:[],
            secondaryInput:[],
            currentBoardValue:[],
            primaryInputUpdated:false,
            secondaryInputUpdated:false,
            primaryAndSecondaryInputUpdated:false,
            currentBoardValueUpdated:false,
            userWord:'',
            submittedWords:[],
            wordSubmitted:false,
            submittedWordLocations:[],
            subLocExists:false,
            tileWordValues:{},
            apiWord:null,
            apiWordRetrieved:false,
            winValues:['10','20','12','22','11','21'],
            wordsAccepted:['met','mint','mine','time','men','emit','min','mite','nite','nit','ment','ten','tie']
        }
        this.createBoard=this.createBoard.bind(this)
        this.tableGenerator=this.tableGenerator.bind(this)
        this.logger=this.logger.bind(this)
        this.tableXHeadGenerator=this.tableXHeadGenerator.bind(this)
        this.xHeadClick=this.xHeadClick.bind(this)
        this.yHeadClick=this.yHeadClick.bind(this)
        this.inputter=this.inputter.bind(this)
        this.outputter=this.outputter.bind(this)
        this.setInputOrder=this.setInputOrder.bind(this)
        this.userWordClear=this.userWordClear.bind(this)
        this.initialState=this.initialState.bind(this)
        this.updatePrimary=this.updatePrimary.bind(this)
        this.updateSecondary=this.updateSecondary.bind(this)
        this.boardHiglighter=this.boardHiglighter.bind(this)
        this.userWordSubmit=this.userWordSubmit.bind(this)
        this.submittedWordDisplay=this.submittedWordDisplay.bind(this)
        this.submittedWordDelete=this.submittedWordDelete.bind(this)
        this.apiWordGetter=this.apiWordGetter.bind(this)
        this.checkWin=this.checkWin.bind(this)
    }
    //lyfe cycle dawwwg
    componentDidMount(){
        this.initialState()
    }
    initialState(){
        let xWord = this.state.xWord.split('')
        let yWord = this.state.yWord.split('')
        xWord.unshift('')
        let headerValues = xWord.concat(yWord)
        let xWordObjArr = []
        let yWordObjArr = []

        //creating oject arrays
        headerValues.map((headerValue,index)=>{
            if(index < (xWord.length)){
                xWordObjArr.push({value:[headerValue],column:[index],clicked:0})
            }else{
                yWordObjArr.push({value:[headerValue],row:[index - xWord.length],clicked:0})
            }
        })

        //set state
        if (!this.state.headerStateLoaded){
            this.setState({
                xHeaderState: xWordObjArr,
                yHeaderState: yWordObjArr,
                headerStateLoaded: true
            })

        //testing
        console.log('setting heads')
        }
        if(this.state.headerStateLoaded){
            console.log('heads set')
        }
    }
    //taking values from clicked pieces
    xHeadClick(letterValue,clicked,column,index){
        let xStateUpdate = [...this.state.xHeaderState]
        let indexClicked = xStateUpdate[index].clicked

        let userWordUpdate = this.state.userWord
        userWordUpdate = userWordUpdate + letterValue
        this.isWord(userWordUpdate)
        if(indexClicked === 0){
            xStateUpdate[index].clicked = 1
        }
        else{
            xStateUpdate[index].clicked = 0
        }
        
        //console.log(xStateUpdate)
        this.setState({
            xHeaderState:xStateUpdate,
            userWord:userWordUpdate
        })
        let colString = column.toString()
        this.inputter(colString)
        
    }
    yHeadClick(letterValue,clicked,row,index){
        let yStateUpdate = [...this.state.yHeaderState]
        let indexClicked = yStateUpdate[index].clicked

        let userWordUpdate = this.state.userWord
        userWordUpdate = userWordUpdate + letterValue
        this.isWord(userWordUpdate)
        //click change
        if(indexClicked === 0){
            yStateUpdate[index].clicked = 1
        }
        else{
            yStateUpdate[index].clicked = 0
        }
        //console.log(yStateUpdate)
        this.setState({
            yHeaderState:yStateUpdate,
            userWord:userWordUpdate
        })
        let rowString = row.toString()
        this.inputter('',rowString)
        
    }
   
    apiWordGetter(word){
        const headers = {
            headers:{
            "app_key":"ed82cd0a6d3908deec2eda1c3d69e2d8",
            "app_id":"3cdaa454"}
            };
        axios.defaults.headers.common["app_key"] = "";
        axios.defaults.headers.common["app_id"] = "";
        axios
            .get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}`)
            .then(res=>{
                console.log(res)
            })
    }
    isWord(word){
        if(this.state.wordsAccepted.includes(word)){
            this.setState({
                apiWordRetrieved:true
            })
        }
    }
    userWordClassChanger(){
        if(this.state.apiWordRetrieved){
            return 'yellow'
        }
    }
    checkWin(){
        console.log('checkwin')
        let winArr = this.state.winValues
        let boardArr = this.state.submittedWordLocations
        if(winArr.sort().toString() === boardArr.sort().toString()){
            alert('You win!')
            
        }
    }










    //board value setting/THE MEAT
    
    inputter(input1,input2){
        this.setState({
            currentBoardValueUpdated:false,
        })
        let primaryArr = [...this.state.primaryInput]
        let secondaryArr = [...this.state.secondaryInput]
        
        this.setInputOrder(input1,input2,primaryArr,secondaryArr)
        
        
    }
    
    setInputOrder(input1,input2,primaryInput,secondaryInput){
        //console.log(input1,input2,'start set input')
        //debugger
      if(!primaryInput[0]){
        if(input1){
          primaryInput.push('x')
          primaryInput.push(input1)
          this.updatePrimary(primaryInput)
        }
        else if(input2){
          primaryInput.push('y')
          primaryInput.push(input2)
          this.updatePrimary(primaryInput)
        }
      }
      else{
        if(primaryInput[0]==='x'){
          if(input1){
            if(!primaryInput.includes(input1)){
              primaryInput.push(input1)
              this.updatePrimary(primaryInput)
            }
          }
          if(input2){
            if(!secondaryInput.includes(input2)){
              secondaryInput.push(input2)
              this.updateSecondary(secondaryInput)
            }
          }
        }
        else{
          if(input2){
            if(!primaryInput.includes(input2)){
              primaryInput.push(input2)
              this.updatePrimary(primaryInput)
            }
          }
          if(input1){
            if(!secondaryInput.includes(input1)){
              secondaryInput.push(input1)
              this.updateSecondary(secondaryInput)
            }
          }
        }
      }
      //console.log(secondaryInput)
      //debugger
    }
    updatePrimary(inp){
        this.setState({
            primaryInput:inp,
            primaryInputUpdated:true
        })
        setTimeout( () => {
            this.middler()
          } , 1) 
    }
    updateSecondary(inp){
        this.setState({
            secondaryInput:inp,
            secondaryInputUpdated:true
        })
        setTimeout( () => {
            this.middler()
          } , 1) 
    }
    middler(){
        let outputArray = []
        if(this.state.primaryInputUpdated && this.state.secondaryInputUpdated){
            let primaryInput = [...this.state.primaryInput]
            let secondaryInput = [...this.state.secondaryInput]
                if(primaryInput[0]==='x'){
                    primaryInput.forEach(prim=>{
                        if(prim != 'x'){
                            let x = prim
                            secondaryInput.forEach(sec=>{
                                let y = sec
                                this.outputter(x,y,outputArray,primaryInput)
                            })
                        }
                    })
                }
                else{
                    primaryInput.forEach(prim=>{
                        if(prim != 'y'){
                            let y = prim
                            secondaryInput.forEach(sec=>{
                                let x = sec
                                this.outputter(x,y,outputArray,primaryInput)
                            })
                        }
                    })
                }
                this.setState({
                    currentBoardValue:outputArray,
                    currentBoardValueUpdated:true,
                    primaryAndSecondaryInputUpdated:false,
                })
                   
        }
        if(this.state.currentBoardValueUpdated){
        //console.log('end output boardval',this.state.currentBoardValue)
        }
    }
    outputter(input1,input2,arr,primaryInput){ 
      let boardVal = `${input1}${input2}`
      //if you've got two inputs add it to the array if it isn't already there
      if(
          (input1 && input2) 
          && (primaryInput.includes(input1) ||primaryInput.includes(input2))
          && !arr.includes(boardVal)
        ){
        arr.push(boardVal)
      }
    }








    
    boardHiglighter(id){
        let submittedWordLocations = this.state.submittedWordLocations
        //console.log(submittedWordLocations)
        if(this.state.wordSubmitted && submittedWordLocations.includes(id) && this.state.currentBoardValue.includes(id)){
            return 'red'
         }
        if(this.state.wordSubmitted && submittedWordLocations.includes(id)){
            return 'green'
        }
        if(this.state.currentBoardValue.includes(id)){
            return 'yellow'
        }
        else{
            return 'block'
        }
        
    }




    submittedWordDisplay(id){
        console.log('in submittedWordDisplay')
        console.log(this.state.tileWordValues[id])
        if(this.state.tileWordValues){
            return this.state.tileWordValues[id]
        }
    }
    submittedWordDelete(key,string){
        let tileWordValues = this.state.tileWordValues
        tileWordValues
        // for (const key of tileWordValues.keys(obj)) {
        //     console.log(key, obj[key]);
        // }
    }

    //testing funcs
    logger(){
        //this.submittedWordDisplay('11')
        // console.log('this is logger')
        this.apiWordGetter('eye')
    }

    //user word funcs

    //thank you https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
    comparator(haystack, needle) {
        return needle.some(function (v) {
            return haystack.indexOf(v) >= 0;
        });
    };
    userWordSubmit(event){
    
        //event.preventDefault()
        let word = this.state.userWord
        let wordLocation = this.state.currentBoardValue
        let userSubmittedWord = {word:{word,wordLocation}}
        let submittedWordsUpdate = [...this.state.submittedWords]
        let submittedWordLocationsUpdate = [...this.state.submittedWordLocations]
        let tileWordValuesUpdate = this.state.tileWordValues
        // console.group()
        //     console.log(userSubmittedWord)
        //     console.log(wordLocation)
        // console.groupEnd()

        // let tileWordValuesUpdate = [...this.state.tileWordValues]
        if(this.state.apiWordRetrieved){
           
            if(word.length >= 3){
                if(!this.state.wordSubmitted){
                    console.log('initial submit')
                    submittedWordsUpdate.push(userSubmittedWord)
                    wordLocation.forEach(elem=>{
                        submittedWordLocationsUpdate.push(elem)
                    })
                    submittedWordsUpdate.push(userSubmittedWord)
                    
                    wordLocation.forEach(elem=>{
                            tileWordValuesUpdate[elem] = this.state.userWord
                    })
                    
                    // wordLocation.forEach(elem=>{
                    //     tileWordValuesUpdate.push({[elem]:this.state.userWord})
                    // })
                    this.setState({
                        submittedWords:submittedWordsUpdate,
                        submittedWordLocations:submittedWordLocationsUpdate,
                        wordSubmitted:true,
                        tileWordValues:tileWordValuesUpdate,
                        apiWordRetrieved:false
                    })
                    this.userWordClear()
                }
                else if(this.comparator(this.state.submittedWordLocations,wordLocation)){
                    console.log('conflicting submit')
                        this.setState({
                            subLocExists:false
                        })
                        return alert(`you can't submit on top of already used squares`)
                }
                else{
                    console.log('regular submit')
                    submittedWordsUpdate.push(userSubmittedWord)
                    wordLocation.forEach(elem=>{
                        submittedWordLocationsUpdate.push(elem)
                    })
                    wordLocation.forEach(elem=>{
                        tileWordValuesUpdate[elem] = this.state.userWord
                    })
                    // wordLocation.forEach(elem=>{
                    //     tileWordValuesUpdate.push({[elem]:this.state.userWord})
                    // })
                    this.setState({
                        submittedWords:submittedWordsUpdate,
                        submittedWordLocations:submittedWordLocationsUpdate,
                        wordSubmitted:true,
                        tileWordValues:tileWordValuesUpdate,
                        apiWordRetrieved:false
                    })
                    this.userWordClear()
                }
            }
        }
    }



    userWordClear(event){
        //event.preventDefault()
        this.setState({
            primaryInput:[],
            secondaryInput:[],
            currentBoardValue:[],
            primaryInputUpdated:false,
            secondaryInputUpdated:false,
            primaryAndSecondaryInputUpdated:false,
            currentBoardValueUpdated:false,
            userWord:''
        })
    }
    // word entry form render
    userWordEntryRender(){
        let word = this.state.userWord
        return(
            <div className='userWordBox'>
                <button onClick={this.userWordClear}>X</button>
                <span name='userWord' className={this.userWordClassChanger()}>{word}</span>
                <button onClick={() => this.userWordSubmit()}>√</button>
            </div>
        )
    }





    //table generating ordered last to first in firing
    tableFiller(arr,row){      
        if (!arr[0]){
            arr.shift()
        }
        return(
            arr.map((arrValue,index)=>{
                let location = `${this.state.xHeaderState[index+1].column}${row}`
                return <td key={index} id={location} onClick={()=>{this.submittedWordDelete(location,this.submittedWordDisplay(location))}} className={this.boardHiglighter(location)}>{this.submittedWordDisplay(location)}</td>
            })
        )
    }

    tableYHeadGenerator(xHeaders,yHeaders){
        return(
            yHeaders.map((yHeaderValue,index)=>{
                //console.log(yHeaderValue,index)
                return (
                    <tr>
                        <YHeadPiece yHeadClick={this.yHeadClick} index={index} key={index} yData={this.state.yHeaderState[index]}/>
                        {this.tableFiller(xHeaders,index)}
                    </tr>
                )
            })
        )
    }

    tableXHeadGenerator(xHeaders){
        return(
            xHeaders.map((xHeaderValue, index)=>{
                //console.log(index,'index log pre generate xheadpiece')
                return <XHeadPiece index={index} xHeadClick={this.xHeadClick} key={index} xData={this.state.xHeaderState[index]}/>
            })
        )
    }
    //these are the general board layout function should set the gamestate here
    tableGenerator(arr1,arr2){
        return(
            <div>
                <table>
                    {this.tableXHeadGenerator(arr1)}
                    <tbody>
                        {this.tableYHeadGenerator(arr1,arr2)}
                    </tbody>
                </table>
            </div>
        )
    }
    createBoard(){
        if(this.state.headerStateLoaded){
            let xWord = this.state.xWord.split('')
            let yWord = this.state.yWord.split('')
            
            xWord.unshift('')
            return(
                <div>
                    {this.tableGenerator(xWord,yWord)}
                </div>
            )
        }
    }
    //rendering
    render(){
        this.checkWin()
        return(
            <div className='board'>
                <h1>blockwritr</h1>
                {this.userWordEntryRender()}
                {this.createBoard()}
                    {/* <button onClick={this.logger}>check the state</button> */}
            </div>
        )
    }
}

export default Board;
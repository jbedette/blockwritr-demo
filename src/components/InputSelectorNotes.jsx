let primaryInput = []
let secondaryInput = []
let boardHighlights = null


function inputter(input1,input2){
  let outputArray = []
  setInputOrder(input1,input2)
  
  if(primaryInput[0]==='x'){
    primaryInput.forEach(prim=>{
      if(prim != 'x'){
      let x = prim
      secondaryInput.forEach(sec=>{
        let y = sec
        outputter(x,y,outputArray)
      })
    }})
  }
  else{
    primaryInput.forEach(prim=>{
      if(prim != 'y'){
      let y = prim
      secondaryInput.forEach(sec=>{
        let x = sec
        outputter(x,y,outputArray)
      })
    }})
  }
  boardHighlights = outputArray
  console.log('end output',boardHighlights)
}

function setInputOrder(input1,input2){
  if(!primaryInput[0]){
    if(input1){
      primaryInput.push('x')
      primaryInput.push(input1)
    }
    else if(input2){
      primaryInput.push('y')
      primaryInput.push(input2)
    }
  }
  else{
    if(primaryInput[0]==='x'){
      if(input1){
        if(!primaryInput.includes(input1)){
          primaryInput.push(input1)
        }
      }
      if(input2){
        if(!secondaryInput.includes(input2)){
          secondaryInput.push(input2)
        }
      }
    }
    else{
      if(input2){
        if(!primaryInput.includes(input2)){
          primaryInput.push(input2)
        }
      }
      if(input1){
        if(!secondaryInput.includes(input1)){
          secondaryInput.push(input1)
        }
      }
    }
  }
  console.log('primary values',primaryInput)
  console.log('secondary values',secondaryInput)
}

function outputter(input1,input2,arr){
  
  let boardVal = `${input1}${input2}`
  //check if there's a new first input
  
  //if you've got two inputs add it to the array if it isn't already there
  if(
      (input1 && input2) 
      && (primaryInput.includes(input1) ||primaryInput.includes(input2))
      && !arr.includes(boardVal)
    ){
    arr.push(boardVal)
  }
}

inputter('0')
inputter('','1')
inputter('2')
inputter('','3')
inputter('','5')
inputter('4')
inputter('6')




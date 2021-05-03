

function addressRegex(input){
    let regex = /^(?=.{1,30}$)[a-zåäö]+\s[0-9]+$/i;
    return regex.test(input);
  }
  
  function nameRegex(input){
    let regex = /^(?=.{1,30}$)[a-zåäö]+(?:['_.\s][a-z]+)*$/i;
    return regex.test(input);
  }
  
  function emailRegex(input){
    let regex = /^(?=.{1,30}$)[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
    return regex.test(input);
  }
  
  function cityRegex(input){
    let regex = /^(?=.{1,30}$)[a-zåäö]+(?:[\s-][a-zåäö]+)*$/i;
    return regex.test(input);
  }
  
  function zipCodeRegex(input){
    let regex = /^\d\d\d\s\d\d$/;
    return regex.test(input);
  }

  function passwordRegex(input){
      let regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,30}$/i;
      return regex.test(input);
  }

  function phoneRegex(input){
      let regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      return regex.test(input);
  }

  function onlyNumbersRegex(input){
    let regex = /^(?=.{1,30}$)[a-zåäö]+\s[0-9]*$/i;
    return regex.test(input);
  }

  function onlyimageUrlRegex(input){
  let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  return regex.test(input);
}



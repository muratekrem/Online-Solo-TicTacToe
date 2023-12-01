
export function position(obj)  {
        var arr = [] 
        Object.entries(obj).map(([keys,values]) => {
            if(values===null){
                arr.push(keys)
            } 
            return keys;
        })

    return arr
}
   
export function random(arr){
   // console.log(arr);
        return arr[Math.floor(Math.random() * (arr.length))];

// array.length max olucak , min 0 olcak
}

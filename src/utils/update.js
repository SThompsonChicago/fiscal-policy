function Update(obj) {
    let str1 = 'https://singwithsims.herokuapp.com/solver1?'
    for (const key in obj.current) {
        str1 = str1 + `${key}=${obj.current[key]}&`
    }
    let address = str1.slice(0, -1);
    fetch(address)
    .then(res => res.json())
    .then((data) => {
        console.log(data['y']);
        for (const key in obj.current){
            obj.current[key] = data[key];
        }
        obj.debtRatioSeries.push(obj.current['GD']/obj.current['Y']);
        obj.deficitRatioSeries.push(obj.current['deltagd']/obj.current['y']);
    })
    return obj.time + 1;
}

export default Update;
function UpdateCurrent(obj) {
    obj.current.gr = obj.percent/100;
    obj.current.theta = obj.tax/100;
    obj.current.r = obj.interest/100;
    obj.current.pi = obj.inflation/100;
    
    return true;
}

export default UpdateCurrent;
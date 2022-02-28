function UpdateInitial(obj, init) {
    for(const key in obj.current){
        obj.current[key] = init.current[key];
    }
    
    return true;
}

export default UpdateInitial;
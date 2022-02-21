const spawn = require('child_process').spawn;

ratio = 100;

current = {
    "yd": 1.0,
    "alpha1": 0.88,
    "v": ratio/100,
    "v*": ratio/100,
    "alpha3": 1.0,
    "px": 0.5,
    "T": 0.2,
    "Y": 1.0,
    "V": ratio/100,
    "rr": 0.03,
    "pi": 0.01,
    "y": 1.0,
    "t": 0.2,
    "gT": 0.2,
    "deltagd": 0.0,
    "GT": 0.1,
    "G": 1.0,
    "DEF": 0.1,
    "GD": ratio/100,
    "g": 0.1,
    "p": 1.0,
}

arr = Object.values(current);

console.log(arr)

arr.splice(0, 0, './app.py');

const process = spawn('python', arr);

process.stdout.on('data', data => {
    a = JSON.parse(data);

    console.log(a)

    current["yd"] = a[0];
    current["alpha1"] = a[1];
    current["v"] = a[2];
    current["v*"] = a[3];
    current["alpha3"] = a[4];
    current["px"] = a[5];
    current["T"] = a[6];
    current["Y"] = a[7];
    current["V"] = a[8];
    current["rr"] = a[9];
    current["pi"] = a[10];
    current["y"] = a[11];
    current["t"] = a[12];
    current["gT"] = a[13];
    current["deltagd"] = a[14];
    current["GT"] = a[15];
    current["G"] = a[16];
    current["DEF"] = a[17];
    current["GD"] = a[18];
    current["g"] = a[19];
    current["p"] = a[20];

    console.log(current["GD"]/current["Y"]);

});
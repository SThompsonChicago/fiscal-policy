import sys
import math

percent = 2.5
tax = 25.0
interest = 3.0
inflation = 2.0
years = 100

current = {
    "yd": float((sys.argv[1])),
    "alpha1": float((sys.argv[2])),
    "v": float((sys.argv[3])),
    "v*": float((sys.argv[4])),
    "alpha3": float((sys.argv[5])),
    "px": float((sys.argv[6])),
    "T": float((sys.argv[7])),
    "Y": float((sys.argv[8])),
    "V": float((sys.argv[9])),
    "rr": float((sys.argv[10])),
    "pi": float((sys.argv[11])),
    "y": float((sys.argv[12])),
    "t": float((sys.argv[13])),
    "gT": float((sys.argv[14])),
    "deltagd": float((sys.argv[15])),
    "GT": float((sys.argv[16])),
    "G": float((sys.argv[17])),
    "DEF": float((sys.argv[18])),
    "GD": float((sys.argv[19])),
    "g": float((sys.argv[20])),
    "p": float((sys.argv[21])),
}

params = {
    "gr": percent/100,
    "theta": tax/100,
    "alpha2": 0.2,
    "alpha10": 0.9,
    "iota": 2.0,
    "r": interest/100,
    "pi": inflation/100,
}

last = current.copy()

next = current.copy()

def f():
    global last
    global current
    global next
    global params

    next["yd"] = current["y"] + current["rr"] * last["v"] - current["t"]
    next["alpha1"] = params["alpha10"] - params["iota"] * current["rr"]
    next["v"] = last["v"] + params["alpha2"] * (current["v*"] - last["v"])
    next["v*"] = current["alpha3"] * current["yd"]
    next["alpha3"] = (1 - current["alpha1"])/params["alpha2"]
    next["px"] = current["yd"] - current["v"] + last["v"]
    next["T"] = params["theta"] * (current["Y"] + params["r"] * last["V"])
    next["Y"] = current["y"] * current["p"]
    next["V"] = current["v"] * current["p"]
    next["rr"] = (1 + params["r"])/(1 + current["pi"]) - 1
    next["pi"] = params["pi"]
    next["y"] = last["y"] * (1 + params["gr"])
    next["t"] = current["T"]/current["p"]
    next["gT"] = current["g"] + current["rr"] * last["GD"]/last["p"]
    next["deltagd"] = current["gT"] - current["t"]
    next["GT"] = current["G"] + params["r"] * last["GD"]
    next["G"] = current["g"] * current["p"]
    next["DEF"] = current["GT"] - current["T"]
    next["GD"] = last["GD"] + current["DEF"]
    next["g"] = current["y"] - current["px"]
    next["p"] = last["p"] * (1 + current["pi"])

    errorsquare = 0

    for key in current:
        errorsquare += (next[key] - current[key])**2
        current[key] = next[key]
    
    return math.sqrt(errorsquare)

iterations = 0
error = 1.0

for year in range(years):
    while iterations < 100 and error > 0.00000001:
        error = f()
        iterations += 1
    for key in current:
        last[key] = current[key]
    iterations = 0
    error = 1.0

ratio = current["V"]/current["Y"]
steady = ((1 - current["alpha1"])*(1 - params["theta"])*(1 + params["gr"]))/(params["gr"] + params["alpha2"] + (1 - current["alpha1"])*params["theta"]*current["pi"]/(1+current["pi"]) - (1 - current["alpha1"])*(1 - params["theta"])*current["rr"])

# arr = [ratio, steady, current["GD"]/current["Y"], current["V"]/current["Y"], current["p"]]

arr = [
    current["yd"], 
    current["alpha1"], 
    current["v"], 
    current["v*"], 
    current["alpha3"], 
    current["px"], 
    current["T"], 
    current["Y"], 
    current["V"], 
    current["rr"], 
    current["pi"], 
    current["y"], 
    current["t"], 
    current["gT"], 
    current["deltagd"], 
    current["GT"],
    current["G"],
    current["DEF"],
    current["GD"],
    current["g"],
    current["p"]
]

print(arr)
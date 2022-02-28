import UpdateCurrent from './upcurrent';
import UpdateInitial from './upinitial';
import Update from './update';

const initialState = {
    isRunning: false,
    time: 0,
    periods: 0,
    mil: 250,
    ratio: 41,
    percent: 2.5,
    tax: 25,
    interest: 3,
    inflation: 2,
    fact: true,
    current: {
      "yd": 1.0,
      "alpha1": 0.88,
      "v": 40.9/100,
      "vstar": 40.9/100,
      "alpha3": 1.0,
      "px": 0.5,
      "T": 0.2,
      "Y": 1.0,
      "V": 40.9/100,
      "rr": 0.03,
      "pi": 0.01,
      "y": 1.0,
      "t": 0.2,
      "gT": 0.2,
      "deltagd": 0.0,
      "GT": 0.1,
      "G": 1.0,
      "DEF": 0.1,
      "GD": 40.9/100,
      "g": 0.1,
      "p": 1.0,
      "gr": 2.5/100,
      "theta": 25/100,
      "alpha2": 0.2,
      "alpha10": 0.9,
      "iota": 2.0,
      "r": 3/100,
      "pi": 2/100
    },
    deficitRatioSeries: [],
    debtRatioSeries: []
  }

function reducer(state, action) {
    switch (action.type) {
        case "run":
            return { ...state, isRunning: true };
        case "stop":
            return { ...state, isRunning: false };
        case "reset":
            UpdateInitial(state, initialState);
            UpdateCurrent(state);
            return { ...state, isRunning: false, time: 0, debtRatioSeries: [], deficitRatioSeries: [] };
        case "iterate":
            return { ...state, time: Update(state), debtRatioSeries: state.debtRatioSeries, deficitRatioSeries: state.deficitRatioSeries, current: state.current };
        case "increasepercent":
            return { ...state, percent: (state.percent < 15) * (state.percent + 0.5) + (state.percent >= 15) * 15, fact: UpdateCurrent(state), current: state.current };
        case "decreasepercent":
            return { ...state, percent: (state.percent > 1) * (state.percent - 0.5) + (state.percent <= 1) * 1, fact: UpdateCurrent(state), current: state.current };
        case "increasetax":
            return { ...state, tax: (state.tax < 70) * (state.tax + 1) + (state.tax >= 70) * 70, fact: UpdateCurrent(state), current: state.current };
        case "decreasetax":
            return { ...state, tax: (state.tax > 5) * (state.tax - 1) + (state.tax <= 5) * 5, fact: UpdateCurrent(state), current: state.current };
        case "increaseinterest":
            return { ...state, interest: (state.interest < 25) * (state.interest + 1) + (state.interest >= 25) * 25, fact: UpdateCurrent(state), current: state.current };
        case "decreaseinterest":
            return { ...state, interest: (state.interest > 0) * (state.interest - 1) + (state.interest <= 0) * 0, fact: UpdateCurrent(state), current: state.current };
        case "increaseinflation":
            return { ...state, inflation: (state.inflation < 20) * (state.inflation + 1) + (state.inflation >= 20) * 20, fact: UpdateCurrent(state), current: state.current };
        case "decreaseinflation":
            return { ...state, inflation: (state.inflation > 0) * (state.inflation - 1) + (state.inflation <= 0) * 0, fact: UpdateCurrent(state), current: state.current };
        default:
            throw new Error();
    }
}

export default reducer;
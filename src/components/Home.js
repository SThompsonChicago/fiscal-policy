import { useReducer, useEffect, useRef } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import reducer from '../utils/reducers';

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const styles = {
  hov: {
    cursor: 'pointer',
  },
  right: {
    float: "right",
  },
  space: {
    margin: "5px",
  },
  red: {
    backgroundColor: 'black',
    color: 'white',
    margin: "3px",
  },
}

const ratio = 40.9;
const percent = 2.5;
const tax = 25;
const interest = 3;
const inflation = 2;

const initialState = {
  isRunning: false,
  time: 0,
  periods: 0,
  mil: 250,
  current: {
    "yd": 1.0,
    "alpha1": 0.88,
    "v": ratio/100,
    "vstar": ratio/100,
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
    "gr": percent/100,
    "theta": tax/100,
    "alpha2": 0.2,
    "alpha10": 0.9,
    "iota": 2.0,
    "r": interest/100,
    "pi": inflation/100
  },
  deficitRatioSeries: [],
  debtRatioSeries: []
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    } else {
      idRef.current = setInterval(() => dispatch({ type: 'iterate' }), state.mil);
      return () => {
        clearInterval(idRef.current);
        idRef.current = 0;
      };
    };
  }, [state.isRunning]);

  return (
    <div className="notification is-black">

      {/* Display simulation control panel */}
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title is-4 is-size-6-mobile">
              Control panel
            </p>
            <header className="navbar">
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "run" })}
              >
                <span>Run</span>
              </a>
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "stop" })}
              >
                <span>Pause</span>
              </a>
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "reset" })}
              >
                <span>Reset</span>
              </a>

            </header>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p>
              Annual GDP growth rate: {state.current.gr.toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasegamma0" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasegamma0" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasesd" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasesd" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p>
              
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasesigma" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasesigma" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasexi" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasexi" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p>
              
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseud" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseud" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseeta" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseeta" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
      </div>

      {/* Display dynamic charts */}
      <div className='box'>
        <Line
          data={{
            labels: xValues(state.time),
            datasets: [
              {
                label: 'Government debt to GDP ratio',
                data: state.debtRatioSeries,
                backgroundColor: 'white',
                borderColor: '#A00000',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
              {
                label: 'Government deficit to GDP ratio',
                data: state.deficitRatioSeries,
                backgroundColor: 'white',
                borderColor: 'black',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          }}
        />
      </div>
    </div>
  )
}

function xValues(n) {
  const arr = [...Array(n)].map((_, x) => x + 1);
  arr.pop();
  return arr;
}
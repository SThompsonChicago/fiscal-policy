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


<div class="tile is-ancestor">
  <div class="tile is-vertical is-12">
    <div class="tile">
      <div class="tile is-parent is-vertical is-4">
        <article className="tile is-child box is-white">
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
        <article className="tile is-child box">
            <p>
              Annual GDP growth rate: {state.percent.toFixed(1)}%
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasepercent" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasepercent" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
            Income tax rate: {state.tax.toFixed(1)}%
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasetax" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasetax" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
          <article className="tile is-child box">
            <p>
            Nominal interest rate: {state.interest.toFixed(1)}%
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseinterest" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseinterest" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              Inflation rate: {state.inflation.toFixed(1)}%
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseinflation" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseinflation" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-white">
        <p className="title is-4 is-size-6-mobile has-text-centered">
              Dynamics of Government Debt and Budget Deficit
            </p>
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

        </article>
      </div>
    </div>
  </div>
</div>

      
    </div>
  )
}

function xValues(n) {
  const arr = [...Array(n)].map((_, x) => x + 1);
  arr.pop();
  return arr;
}
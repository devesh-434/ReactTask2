import { useState } from "react"
import "./Calculator.css"

export function Calculator() {
  const [result, setResult] = useState("0")
  const CalculatorStyle = {
    width: "100%",
    height: "100%",
  }
  const ButtonSegmentStyle = {
    width: "100%",
    height: "55%",
  }
  const DisplayStyle = {
    width: "100%",
    height: "45%",
  }
  const DisplayRowStyle = {
    width: "100%",
    height: "25%",
  }
  const ButtonRowStyle = {
    width: "100%",
    height: "25%",
  }
  const handleChange = (event) => {
    if (result === "0") {
      setResult(event.target.value)
    } else {
      setResult(result + event.target.value)
    }
  }
  const precedence = (a, b) => {
    if (a === "+" || a === "-") {
      return true
    } else {
      if (b === "x" || b === "/") {
        return true
      } else {
        return false
      }
    }
  }
  const evaluate = (x, y, o) => {
    if (o === "+") {
      return x + y
    } else if (o === "-") {
      return x - y
    } else if (o === "x") {
      return x * y
    } else if (o === "/") {
      return x / y
    }
  }
  const handleCompute = () => {
    let answer = "0"
    let stackNumbers = []
    let stackOperators = []
    let temp = "0"
    for (let c of result) {
      if (c === "/") {
        stackNumbers.push(Number(temp))
        temp = "0"
        while (
          stackOperators.length > 0 &&
          precedence("/", stackOperators[stackOperators.length - 1])
        ) {
          let y = stackNumbers.pop()
          let x = stackNumbers.pop()
          stackNumbers.push(evaluate(x, y, stackOperators.pop()))
        }
        stackOperators.push("/")
      } else if (c === "+") {
        stackNumbers.push(Number(temp))
        temp = "0"
        while (
          stackOperators.length > 0 &&
          precedence("+", stackOperators[stackOperators.length - 1])
        ) {
          let y = stackNumbers.pop()
          let x = stackNumbers.pop()
          stackNumbers.push(evaluate(x, y, stackOperators.pop()))
        }
        stackOperators.push("+")
      } else if (c === "x") {
        stackNumbers.push(Number(temp))
        temp = "0"
        while (
          stackOperators.length > 0 &&
          precedence("x", stackOperators[stackOperators.length - 1])
        ) {
          let y = stackNumbers.pop()
          let x = stackNumbers.pop()
          stackNumbers.push(evaluate(x, y, stackOperators.pop()))
        }
        stackOperators.push("x")
      } else if (c === "-") {
        stackNumbers.push(Number(temp))
        temp = "0"
        while (
          stackOperators.length > 0 &&
          precedence("-", stackOperators[stackOperators.length - 1])
        ) {
          let y = stackNumbers.pop()
          let x = stackNumbers.pop()
          stackNumbers.push(evaluate(x, y, stackOperators.pop()))
        }
        stackOperators.push("-")
      } else {
        temp = temp + c
      }
    }
    stackNumbers.push(Number(temp))
    while (stackOperators.length > 0) {
      let y = stackNumbers.pop()
      let x = stackNumbers.pop()
      stackNumbers.push(evaluate(x, y, stackOperators.pop()))
    }
    answer = String(stackNumbers.pop())
    setResult(answer)
  }
  const handleDelete = () => {
    if (result.length > 1) {
      setResult(result.substring(0, result.length - 1))
    } else {
      setResult("0")
    }
  }
  return (
    <div
      className="bg-dark-blue extra-round d-flex flex-column shadow"
      style={CalculatorStyle}
    >
      <div
        className="h1 text-light d-flex flex-column justify-content-end align-items-center px-3"
        style={DisplayStyle}
      >
        <div className="row" style={DisplayRowStyle}>
          <button
            className="col-2 d-flex align-items-center borderless bg-dark-blue text-light"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-backspace-reverse"
              viewBox="0 0 16 16"
            >
              <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
            </svg>
          </button>
          <div className="text-end col-10 h3">{result}</div>
        </div>
      </div>
      <div
        className="button-bg text-light extra-round-bottom d-flex flex-column align-items-center justify-content-center px-2 py-1"
        style={ButtonSegmentStyle}
      >
        <div className="row align-items-center" style={ButtonRowStyle}>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"7"}
          >
            7
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"8"}
          >
            8
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"9"}
          >
            9
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"/"}
          >
            /
          </button>
        </div>
        <div className="row align-items-center" style={ButtonRowStyle}>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"4"}
          >
            4
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"5"}
          >
            5
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"6"}
          >
            6
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"x"}
          >
            x
          </button>
        </div>
        <div className="row align-items-center" style={ButtonRowStyle}>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"1"}
          >
            1
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"2"}
          >
            2
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"3"}
          >
            3
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"-"}
          >
            -
          </button>
        </div>
        <div className="row align-items-center" style={ButtonRowStyle}>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"0"}
          >
            0
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"."}
          >
            .
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleCompute}
            value={"="}
          >
            =
          </button>
          <button
            className="button-bg borderless col-3 display-6 fs-3 text-center text-light extra-round"
            onClick={handleChange}
            value={"+"}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator

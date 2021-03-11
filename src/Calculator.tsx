import React from "react";

const Calculator = () => {
  type operationType =
    | "/"
    | "x"
    | "+"
    | "-"
    | "unset"
    | "/-"
    | "x-"
    | "+-"
    | "--";
  const [value, setValue] = React.useState("0");
  const [operand, setOperand] = React.useState<operationType>("unset");
  const [leftSide, setLeftSide] = React.useState<string>(" ");
  const [negative, setNegative] = React.useState<boolean>(false);
  const [lastInput, setLastInput] = React.useState<string>("");

  const numberPressed = (btnVal: string) => {
    if (value === "0") {
      if (btnVal === ".") {
        setValue(value + btnVal);
      } else {
        setValue(btnVal);
      }
    } else if (btnVal === "." && value.includes(".")) {
      return;
    } else {
      setValue(value + btnVal);
    }
    setLastInput("number");
  };

  const performOperation = (
    x: string,
    y: string,
    op: operationType
  ): string => {
    const newX = Number.parseFloat(x);
    const newY = negative ? -Number.parseFloat(y) : Number.parseFloat(y);
    let calculated = 0;
    switch (op[0]) {
      case "/":
        calculated = newX / newY;
        break;
      case "+":
        calculated = newX + newY;
        break;
      case "-":
        calculated = newX - newY;
        break;
      case "x":
        calculated = newX * newY;
        break;
    }
    return calculated.toString();
  };

  const operationPressed = (newOp: operationType): void => {
    if (operand === "unset") {
      setOperand(newOp);
      setLeftSide(value);
      setValue("0");
    } else if (newOp.match(/[+/x]/)) {
      if (lastInput !== "number") {
        setOperand(newOp);
        setNegative(false);
      } else {
        const newValue = performOperation(leftSide, value, operand);
        setLeftSide(newValue);
        setOperand(newOp);
        setValue("0");
        setNegative(false);
      }
    } else if (negative) {
      const newValue = performOperation(leftSide, value, operand);
      setLeftSide(newValue);
      setOperand(newOp);
      setValue("0");
      setNegative(false);
    } else {
      if (value !== "0") {
        const newValue = performOperation(leftSide, value, operand);
        setLeftSide(newValue);
        setOperand(newOp);
        setValue("0");
        setNegative(false);
      } else {
        setNegative(true);
      }
    }
    setLastInput(newOp);
  };

  const clear = () => {
    setValue("0");
    setOperand("unset");
    setLeftSide(" ");
    setNegative(false);
    setLastInput("clear");
  };

  const equalsPressed = () => {
    const newValue = performOperation(leftSide, value, operand);
    setValue(newValue);
    setOperand("unset");
    setLeftSide(" ");
    setNegative(false);
    setLastInput("=");
  };

  return (
    <div className="calculator">
      <div id="display">
        <span id="operand-display">
          {operand !== "unset" ? leftSide + " " + operand : ""}
        </span>
        <span className="btn-content">
          {negative ? "-" : ""}
          {value}
        </span>{" "}
      </div>
      <div onClick={clear} className="calc-btn" id="clear">
        <span className="btn-content">AC</span>{" "}
      </div>
      <div
        onClick={() => operationPressed("/")}
        className="calc-btn operation-btn"
        id="divide"
      >
        <span className="btn-content">/</span>{" "}
      </div>
      <div
        onClick={() => operationPressed("x")}
        className="calc-btn operation-btn"
        id="multiply"
      >
        <span className="btn-content">x</span>{" "}
      </div>
      <div onClick={() => numberPressed("7")} className="calc-btn" id="seven">
        <span className="btn-content">7</span>{" "}
      </div>
      <div onClick={() => numberPressed("8")} className="calc-btn" id="eight">
        <span className="btn-content">8</span>{" "}
      </div>
      <div onClick={() => numberPressed("9")} className="calc-btn" id="nine">
        <span className="btn-content">9</span>{" "}
      </div>
      <div
        onClick={() => operationPressed("-")}
        className="calc-btn operation-btn"
        id="subtract"
      >
        <span className="btn-content">-</span>{" "}
      </div>
      <div onClick={() => numberPressed("4")} className="calc-btn" id="four">
        <span className="btn-content">4</span>{" "}
      </div>
      <div onClick={() => numberPressed("5")} className="calc-btn" id="five">
        <span className="btn-content">5</span>{" "}
      </div>
      <div onClick={() => numberPressed("6")} className="calc-btn" id="six">
        <span className="btn-content">6</span>{" "}
      </div>
      <div
        onClick={() => operationPressed("+")}
        className="calc-btn operation-btn"
        id="add"
      >
        <span className="btn-content ">+</span>{" "}
      </div>
      <div onClick={() => numberPressed("1")} className="calc-btn" id="one">
        <span className="btn-content">1</span>{" "}
      </div>
      <div onClick={() => numberPressed("2")} className="calc-btn" id="two">
        <span className="btn-content">2</span>{" "}
      </div>
      <div onClick={() => numberPressed("3")} className="calc-btn" id="three">
        <span className="btn-content">3</span>{" "}
      </div>
      <div onClick={() => numberPressed("0")} className="calc-btn" id="zero">
        <span className="btn-content">0</span>{" "}
      </div>
      <div onClick={() => numberPressed(".")} className="calc-btn" id="decimal">
        <span className="btn-content">.</span>{" "}
      </div>
      <div onClick={equalsPressed} className="calc-btn" id="equals">
        <span className="btn-content">=</span>{" "}
      </div>
    </div>
  );
};

export default Calculator;

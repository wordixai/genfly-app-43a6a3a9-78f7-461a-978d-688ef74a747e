import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberClick = (num: string) => {
    if (display === "0" || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && operation && !resetDisplay) {
      const result = calculate();
      setPreviousValue(result);
      setDisplay(result);
    } else {
      setPreviousValue(display);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const handleDecimalClick = () => {
    if (resetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleEqualsClick = () => {
    if (!previousValue || !operation) return;
    
    const result = calculate();
    setDisplay(result);
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const calculate = (): string => {
    const prev = parseFloat(previousValue || "0");
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return display;
    }

    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
  };

  const handleBackspaceClick = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePlusMinusClick = () => {
    if (display !== "0") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    }
  };

  const handlePercentClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-900 rounded-2xl shadow-2xl">
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="text-right text-3xl md:text-4xl font-light text-white overflow-x-auto whitespace-nowrap">
          {display}
        </div>
        {previousValue && (
          <div className="text-right text-gray-400 text-sm mt-1">
            {previousValue} {operation}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* First row */}
        <Button 
          onClick={handleClearClick} 
          variant="outline" 
          className="bg-gray-700 hover:bg-gray-600 text-white text-lg"
        >
          AC
        </Button>
        <Button 
          onClick={handlePlusMinusClick} 
          variant="outline" 
          className="bg-gray-700 hover:bg-gray-600 text-white text-lg"
        >
          +/-
        </Button>
        <Button 
          onClick={handlePercentClick} 
          variant="outline" 
          className="bg-gray-700 hover:bg-gray-600 text-white text-lg"
        >
          %
        </Button>
        <Button 
          onClick={() => handleOperationClick("÷")} 
          variant="outline" 
          className={cn(
            "bg-amber-500 hover:bg-amber-400 text-white text-xl",
            operation === "÷" && "bg-amber-400"
          )}
        >
          ÷
        </Button>

        {/* Second row */}
        <Button 
          onClick={() => handleNumberClick("7")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          7
        </Button>
        <Button 
          onClick={() => handleNumberClick("8")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          8
        </Button>
        <Button 
          onClick={() => handleNumberClick("9")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          9
        </Button>
        <Button 
          onClick={() => handleOperationClick("×")} 
          variant="outline" 
          className={cn(
            "bg-amber-500 hover:bg-amber-400 text-white text-xl",
            operation === "×" && "bg-amber-400"
          )}
        >
          ×
        </Button>

        {/* Third row */}
        <Button 
          onClick={() => handleNumberClick("4")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          4
        </Button>
        <Button 
          onClick={() => handleNumberClick("5")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          5
        </Button>
        <Button 
          onClick={() => handleNumberClick("6")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          6
        </Button>
        <Button 
          onClick={() => handleOperationClick("-")} 
          variant="outline" 
          className={cn(
            "bg-amber-500 hover:bg-amber-400 text-white text-xl",
            operation === "-" && "bg-amber-400"
          )}
        >
          -
        </Button>

        {/* Fourth row */}
        <Button 
          onClick={() => handleNumberClick("1")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          1
        </Button>
        <Button 
          onClick={() => handleNumberClick("2")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          2
        </Button>
        <Button 
          onClick={() => handleNumberClick("3")} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          3
        </Button>
        <Button 
          onClick={() => handleOperationClick("+")} 
          variant="outline" 
          className={cn(
            "bg-amber-500 hover:bg-amber-400 text-white text-xl",
            operation === "+" && "bg-amber-400"
          )}
        >
          +
        </Button>

        {/* Fifth row */}
        <Button 
          onClick={() => handleNumberClick("0")} 
          variant="outline" 
          className="col-span-2 bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          0
        </Button>
        <Button 
          onClick={handleDecimalClick} 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-white text-xl"
        >
          .
        </Button>
        <Button 
          onClick={handleEqualsClick} 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-400 text-white text-xl"
        >
          =
        </Button>
      </div>
    </div>
  );
}
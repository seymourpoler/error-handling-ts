
function main() {
    sum(1, 2, consoleOutput)
}

function sum(x: number, y: number, printer: (value: number) => void) {
    printer(x + y)
}

function consoleOutput(value: number) {
    console.log(value)
}

main()

const { evaluate, simplify, parser, add, compile, range } = require("mathjs");
const { plot } = require("plot");
require("@plotex/render-dom");
import { add_block } from "./add_block.js";

const parse = new parser();
const memory = {};

function draw(frame, f, limits, iteration) {
    try {
        const expr = compile(f);

        const xValues = range(limits[0], limits[1], iteration).toArray();
        const yValues = xValues.map(function (number) {
            return expr.evaluate({ 'x': number });
        });

        const data = [{
            x: xValues,
            y: yValues,
            type: 'line'
        }];

        console.log(data);

        const chart = plot(data).renderDOM(frame);
    }
    catch (err) {
        console.error(err)
    }
}

function reed_input_user(e) {

    const target = e.target.getAttribute('target-button');
    const response = document.querySelector("div[target-response='" + target + "']");
    const expression = document.querySelector("input[target-console='" + target + "']").value;

    const result = parse.evaluate(expression);

    if (expression.indexOf('#') == 0) {
        if(expression.indexOf('#plot') == 0){
            let f = expression.slice(5).replace(' ', '').replace(';', '');
            draw(response, f, [-10,10], 0.1);
        }
    }
    if (expression.slice(-1) != ';') {
        if (typeof (result) == 'function') {
            if (memory[expression]) {
                response.innerHTML = memory[expression]
            } else {
                let name_func = expression.slice(0, expression.indexOf('('));
                let content_func = expression.slice(expression.indexOf('=') + 1);
                memory[name_func] = content_func;
                response.innerHTML = "Ok!";
            }
        } else {
            response.innerHTML = result;
        }

        response.classList.add('p-2');
    }

    if (document.querySelector("div[target-block='" + (parseInt(target) + 1) + "']") === null) {
        add_block(target);
    }
}

export { reed_input_user }

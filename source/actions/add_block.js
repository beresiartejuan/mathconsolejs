import { reed_input_user } from "./reed_input_user.js";

function add_block(target){

    const fragmento = document.createDocumentFragment();

    const block_element = document.createElement('div');
    block_element.setAttribute('target-block', parseInt(target) + 1);
    block_element.classList.add('m-1');

    const run_button = document.createElement('button');
    run_button.classList.add('input-group-text', 'btn-primary');
    run_button.innerText = ">>";
    run_button.setAttribute('target-button', block_element.getAttribute('target-block'));
    run_button.onclick = reed_input_user;

    const console_input = document.createElement('input');
    console_input.classList.add('form-control');
    console_input.setAttribute('type', 'text');
    console_input.setAttribute('aria-label', 'Large');
    console_input.setAttribute('aria-describedby', 'inputGroup-sizing-sm');
    console_input.setAttribute('target-console', block_element.getAttribute('target-block'));

    const result_element = document.createElement('div');
    result_element.classList.add('bg-white', 'rounded', 'mt-3', 'mb-3');
    result_element.setAttribute('target-response', block_element.getAttribute('target-block'));

    const input_content = document.createElement('div');
    input_content.classList.add('input-group', 'input-group-lg');

    input_content.appendChild(run_button);
    input_content.appendChild(console_input);

    block_element.appendChild(input_content);
    block_element.appendChild(result_element);
    fragmento.appendChild(block_element);

    document.getElementById('main').appendChild(fragmento);
}

export { add_block }

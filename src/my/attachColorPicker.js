import createElement from './createElement';
import forEachElem from './forEachElem';
import deleteElementIfNotHoveredOver from './deleteElementIfNotHoveredOver';
import { insertAfter, getClientXY } from './extensions';

const attachColorPicker = el => {

    const createColorPicker = clientX => {
        const colorPicker = createElement('input', {
            className: 'colorPicker',
            type: 'color',
            style: {
                left: `${clientX - 22}px`
            },
            onchange: ev => el.style.color = ev.target.value,
            onmouseleave: ev => colorPicker.remove()
        });

        return colorPicker;
    };

    el.addEventListener('mouseover', ev =>
        insertAfter(el, createColorPicker(ev.clientX)));

    el.addEventListener('mouseleave', ev =>
        forEachElem('.colorPicker')
            (deleteElementIfNotHoveredOver, getClientXY(ev), { top: 5 }));
};

export default attachColorPicker;
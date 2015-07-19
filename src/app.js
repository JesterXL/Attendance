/** @jsx hJSX */
import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';

function main(responses) {
  let requests = {
    DOM: responses.DOM.get('paper-checkbox', 'change')
      .map(function(ev)
      {
      	return ev.target.checked;
      })
      .startWith(false)
      .map(toggled =>
        <div>
          <h2>toggled: {toggled ? 'true' : 'false'}</h2>
          <paper-checkbox toggled={toggled}>{toggled ? 'ON' : 'Off'}</paper-checkbox>
        </div>
      )
  };
  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
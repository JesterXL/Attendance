import Cycle from '@cycle/core';
import CycleWeb from '@cycle/web';

function main() {
  return {
    DOM: Cycle.Rx.Observable.interval(1000)
      .map(i => CycleWeb.h(
        'h1', '' + i + ' seconds elapsed'
      ))
  };
}

let drivers = {
  DOM: CycleWeb.makeDOMDriver('#app')
};

Cycle.run(main, drivers);
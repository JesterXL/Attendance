import Cycle from '@cycle/core';
import CycleWeb from '@cycle/web';

function main()
{
	console.log("main");
}

let drivers = {
  DOM: CycleWeb.makeDOMDriver('#app')
};

Cycle.run(main, drivers);
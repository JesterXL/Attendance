/** @jsx hJSX */
import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

function main(responses) {

  let click$ = responses.DOM.get('getPeopleButton', 'click');

  const USERS_URL = "http://localhost:5000/api/users";

  // This is the HTTP request Observable
  let getAllUsers$ = click$.map(() => {
    console.log("click, getting all users.");
    return {
      url: USERS_URL,
      method: 'GET'
    };
  });

  // let requests = {
  //   DOM: responses.DOM.get('paper-checkbox', 'change')
  //     .map(function(ev)
  //     {
  //     	return ev.target.checked;
  //     })
  //     .startWith(false)
  //     .map(toggled =>
  //       <div>
  //         <h2>toggled: {toggled ? 'true' : 'false'}</h2>
  //         <paper-checkbox toggled={toggled}>{toggled ? 'ON' : 'Off'}</paper-checkbox>
  //         <div class="list short" id="peopleList"></div>
  //         <paper-button raised id="getPeopleButton">Get People</paper-button>
  //       </div>
  //     )
  // };

  let users$ = responses.HTTP
    .filter(res$ => res$.request.url.indexOf(USERS_URL) === 0)
    .mergeAll()
    .map(res => res.body)
    .startWith(null);

  let userVTree$ = users$.map(function(users)
    {
      console.log("sup, users:", users);
      if(users != null)
      {
        var rows = [];
        for (var i=0; i < users.length; i++)
        {
            rows.push(<paper-item>{users[i].firstName}</paper-item>);
        }
        return <div>
              <paper-button raised id="getPeopleButton">Get People</paper-button>
              <div class="list short">{rows}</div>
            </div>;
      }
      else
      {
        var cow = function()
        {
          console.log("Moo, sucka");
        };
        return <paper-button raised id="getPeopleButton" on-click="cow">Get People</paper-button>;
      }
      
      
    }
  );

  return {
    DOM: userVTree$,
    HTTP: getAllUsers$
  }
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
});
import axios from 'axios';

import {
  URL_GET_ALL_TEAMS,
URL_GET_ALL_TEAMS_W_SURNAME,
} from "../_constants/configurationConstants";

export const teamService = {
    getAll,
};
/*
function getAll() {
	var teams=[];
return axios.get(URL_GET_ALL_TEAMS, {
      responseType: 'json'
    }).then(res => {
      res.data.map( res => { 
         teams=teams.concat(mergeTeamLeaderList(res));

         })
      } ).then(()=>teams);

}
*/



function getAll() {
    const requestOptions = {
        method: 'GET',
        //headers: authHeader()
    };

    return fetch(URL_GET_ALL_TEAMS_W_SURNAME, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    let json = response.json();

    if (!response.ok) {
        return json.then(Promise.reject.bind(Promise)); // === return json.then(err => {throw err;});
    }

    return json;
}





/*

function  mergeTeamLeaderList(team) {

    axios.get(URL_GET_ALL_TEAMS + team.id + "/team_leader", {
      responseType: 'json'
    }).catch(error =>{}).then(res => {
      if(res!= null){
              if(res.data!=null){
                        team.teamLeaderSurname = res.data.surname;
	      		                        

	      }
              else{
                        team.teamLeaderSurname = "E_teamleader_not_found";
	      		
	      }

      }
      else{
          team.teamLeaderSurname = "E_teamleader_not_found";
      }

    })
return team;
}
*/

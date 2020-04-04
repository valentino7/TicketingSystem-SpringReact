import { teamConstants } from '../_constants';
import { teamService } from '../_services';
import { alertActions } from './';
import {CACHE_VALIDITY_TEAM_LIST} from "../_constants/configurationConstants";

export const teamActions = {
    getAll
};

function invalidateTeamsCache(dispatch) {
  dispatch(invalidateCache());

  function invalidateCache() { return { type: teamConstants.INVALIDATE_TEAM_CACHE } }
}

function getAll() {
//	var teams=[];
    return dispatch => {
        dispatch(request());
        teamService.getAll()
            .then(

              	teams=>{
			
			//var loop=setInterval(
	
			//()=>{
			//	if(teams.length==0 ||  typeof teams[teams.length-1].teamLeaderSurname !== 'undefined'){	
		
					dispatch(success(teams));
			//		clearInterval(loop);

			//	}
			//	else{
					//    clearInterval(loop);

			//	}


			//},2000);
			
           	       setTimeout(invalidateTeamsCache.bind(null, dispatch), CACHE_VALIDITY_TEAM_LIST);
                },
                error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                }
            );

    };

    function request() { return { type: teamConstants.GETALL_REQUEST } }
    function success(teams) { return { type: teamConstants.GETALL_SUCCESS, teams } }
    function failure(error) { return { type: teamConstants.GETALL_FAILURE, error } }
    
}

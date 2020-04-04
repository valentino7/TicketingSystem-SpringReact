/* CACHE */
export const CACHE_VALIDITY_USER_LIST = 60000; // cache validity expressed in milliseconds
export const CACHE_VALIDITY_TICKET_LIST = 60000; // cache validity expressed in milliseconds
export const CACHE_VALIDITY_CONFIGFILE = 3600000; // cache validity expressed in milliseconds
export const CACHE_VALIDITY_TEAM_LIST = 60000; // cache validity expressed in milliseconds

/* PAGINATION */
export const RESULTS_PER_PAGE_TICKETLIST = 10;
export const RESULTS_PER_PAGE_USERLIST = 10;
export const RESULTS_PER_PAGE_TARGET_LIST = 5;
export const RESULTS_PER_PAGE_STOPWORDS_LIST = 10;

/* URLs */
export const URL_LOGIN = 'http://35.239.133.8:8081/ticketingsystem/users/authenticate';
export const URL_TARGET = 'http://35.239.133.8:8081/ticketingsystem/target/';
export const URL_GET_LINKS_STATISTICS = 'http://35.239.133.8:8081/ticketingsystem/clustering/getStatisticAndLinkByTarget/';
export const URL_EDIT_PROFILE = 'http://35.239.133.8:8081/ticketingsystem/users/';
export const URL_GET_ALL_USERS = 'http://35.239.133.8:8081/ticketingsystem/users';
export const URL_GET_ALL_TICKETS = 'http://35.239.133.8:8081/ticketingsystem/ticket';
export const URL_GET_TARGET_TICKETS = 'http://35.239.133.8:8081/ticketingsystem/ticket/search/targetPage/';
export const URL_GET_CATEGORY_TICKETS = 'http://35.239.133.8:8081/ticketingsystem/ticket/findByCategoryAndTarget/';
export const URL_REGISTER = 'http://35.239.133.8:8081/ticketingsystem/users';
export const URL_UPDATE_USER = 'http://35.239.133.8:8081/ticketingsystem/users/';
export const URL_DELETE_USER = 'http://35.239.133.8:8081/ticketingsystem/users/';
export const URL_GET_ALL_TEAMS = 'http://35.239.133.8:8081/ticketingsystem/teams/';
export const URL_GET_ALL_TEAMS_W_SURNAME = 'http://35.239.133.8:8081/ticketingsystem/teams/w_team_leader_surname';
export const URL_GET_CONFIGFILE = 'http://35.239.133.8:8081/ticketingsystem/system/configuration/getConfigurationFile';
export const URL_CLUSTERING = 'http://35.239.133.8:8081/ticketingsystem/clustering/elaborateCluster/';
export const URL_PREPARATION =  'http://35.239.133.8:8081/ticketingsystem/clustering/prepareDataset/';
export const URL_TOTALPAGES_TICKETS = 'http://35.239.133.8:8081/ticketingsystem/ticket/pageNumber/';
export const URL_TOTALPAGES_TICKETS_TARGET = 'http://35.239.133.8:8081/ticketingsystem/ticket/pageTargetNumber/';
export const URL_TOTALPAGES_TICKETS_CATEGORY = 'http://35.239.133.8:8081/ticketingsystem/ticket/pageTargetAndCategoryNumber/';

export const URL_GET_STOPWORDS_BY_TARGET = "http://35.239.133.8:8081/ticketingsystem/stopwords/findStopwordsByTarget/";
export const URL_DELETE_STOPWORD = "http://35.239.133.8:8081/ticketingsystem/stopwords/deleteStopwordByValueAndTarget";
export const URL_CREATE_STOPWORD = "http://35.239.133.8:8081/ticketingsystem/stopwords/createStopword/";
export const URL_GET_ADDS_FIELDS = "http://35.239.133.8:8081/ticketingsystem/system/configuration/getTicketTypology";
export const URL_GET_ALL_TARGETS= 'http://35.239.133.8:8081/ticketingsystem/target';
export const URL_GET_DEFAULT_FIELDS="http://35.239.133.8:8081/ticketingsystem/system/configuration/getTicketAdditionalFields";
export const URL_CREATE_TICKET='http://35.239.133.8:8081/ticketingsystem/ticket';

export const URL_CREATE_TARGET= 'http://35.239.133.8:8081/ticketingsystem/target/';
export const URL_DELETE_TARGET= 'http://35.239.133.8:8081/ticketingsystem/target/';
export const URL_DELETE_TYPOLOGY='http://35.239.133.8:8081/ticketingsystem/system/configuration/deleteTypology/';
export const URL_INSERT_FILE= 'http://35.239.133.8:8081/ticketingsystem/ticket/uploadFiles/';
export const URL_CREATE_TYPOLOGY='http://35.239.133.8:8081/ticketingsystem/system/configuration/addTicketTypology';
export const URL_ADD_FIELD_TO_TYPOLOGY='http://35.239.133.8:8081/ticketingsystem/system/configuration/addTypologyAdditionalField/';
export const URL_DELETE_FIELD_TO_TYPOLOGY="http://35.239.133.8:8081/ticketingsystem/system/configuration/deleteAdditionalField/";

export const URL_GET_CLUSTER = '...';

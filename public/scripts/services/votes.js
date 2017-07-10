app.service('voteService', function($http) {
  var sv = this;

  sv.getVoteItems = function(){
    return $http.get('/voteItems').then(function(response){
      return response
    });
  };

});

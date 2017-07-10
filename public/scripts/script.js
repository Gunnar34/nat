//angular module
var app = angular.module('myApp', ['ui.materialize', 'ngRoute']);

//routes
app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html'
  });
});

//main controller
app.controller('mainController', mainController);

function mainController($scope, voteService){
  var vm = this;
  vm.selectedItems = [];
  vm.votesRemaining = 3;

  vm.getVoteItems = function(){
    voteService.getVoteItems().then(function(res){
      vm.voteItems = res.data;
    })
    localStorage.clear() //clearing for demonstration purposes only
  };

  vm.login = function(){
    //this will eventually send a get route to the server, since i'm not
    //currently implementing User Auth it just sets temp data to the username,
    //the hypothetical get route would also have a boolean that would contain whether
    //or not the person had voted this month
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('hasVoted', false);
    localStorage.setItem('username', vm.username);
    vm.username = ""
    vm.password = ""
    console.log("logged in as", localStorage.getItem('username'));
  };

  vm.select = function(index){
    if (!vm.voteItems[index].selected && vm.votesRemaining > 0) {
      vm.voteItems[index].selected = true;
      vm.voteItems[index].index = index;
      vm.selectedItems.push(vm.voteItems[index]);
      vm.votesRemaining --;
    }
  };

  vm.unSelect = function(index){
    selectIndex = vm.selectedItems[index].index;
    vm.selectedItems.splice(index, 1);
    vm.voteItems[selectIndex].selected = false;
    vm.votesRemaining ++;
  };

  vm.finalizeVotes = function(){
    //this would do an actual server post to tally the votes and change the user
    //hasVoted boolean to true. For the purposes of this prototype it simply changes it in
    //the local storage so they can't vote again.
    var hasVoted = localStorage.getItem('hasVoted')
    if (hasVoted == null) {
      alert('please login');
    }
    else if (hasVoted == 'false' && vm.selectedItems.length == 3) {
      localStorage.setItem('hasVoted', true);
      var votes = vm.selectedItems;
      alert('thanks for voting!')
    }
    else if (hasVoted == 'true') {
      alert("Sorry, you've already voted this month")
    }
    else if (vm.selectedItems.length < 3) {
      alert('please select 3 items')
    }
  };
  //currently after voting you can still edit the tables as if you were going to vote again
  //ideally once there's a database to work with and actual user auth the table would be locked from use if
  //you've already voted and the ones you voted for would already have checkmarks
}

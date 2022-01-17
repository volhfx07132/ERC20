App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
    } else {
      //create a new provider and plug it directly into our local node
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    App.displayAccountInfo();

    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account').text(account);
        web3.eth.getBalance(account, function(err, balance) {
          if(err === null) {
            $('#accountBalance').text(web3.fromWei(balance, "ether") + " ETH");
          }
        })
      }
    });
  },

  initContract: function() {
    $.getJSON('Action.json', function(chainListArtifact) {
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.Action = TruffleContract(chainListArtifact);
      // set the provider for our contracts
      App.contracts.Action.setProvider(App.web3Provider);
      // retrieve the article from the contract
    });
  },

  sendTokenERC20 : function(){
    App.contracts.Action.deployed().then(function(instance) {
      var accountParticipant = $('#account').text();
      instance.sendToken(accountParticipant, 10).then(function(){
       
      })
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
var expect = require('chai').expect;
var path = require('path');
var supertest = require('supertest');
var request = require('supertest-as-promised');
var http = require('http');
var app = require('../helpers/testing_server.js').app

import ReactTestUtils from 'react-addons-test-utils' // ES6
import React from 'react';
import sinon from 'sinon';

import { mount, shallow } from 'enzyme';

import Header from '../../client/components/Header';

var testPort = 9000;

describe('Front End Specification', function() {
  var server;
  before(function(done) {
    server = app.listen(testPort, function() {
      console.log(`testing server is running for front-end client-spec at ${testPort}`);
      done();
    });
  });

  after(function() {
    if(server){
      server.close();
      console.log(`server at ${testPort} closing`);
    }
  });

  describe('Header Component Unit Test', function() {
    it('should have a Home component', function(done) {
      const wrapper = mount(<Header/>);
      expect(wrapper.find(Header)).to.have.length(1); // should have one
      done();
    });

    // it('should have called componentDidMount', (done) => { // ES6 seems to work with enzyme asserts
    //   sinon.spy(Home.prototype, 'componentDidMount');
    //   const wrapper = mount(<Home />);
    //   expect(Home.prototype.componentDidMount.calledOnce).to.equal(true);
    //   done();
  }); // end of describe-header
}); 

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { mount, shallow } from 'enzyme';
import Curriculum from '../RLMSCurriculum/index.jsx'
import jasmine from 'jasmine-ajax'

describe('make sure header appears', function () {
  
  it('should have lessons', ()=>{
    const wrapper = mount(<Curriculum/>);
    expect(wrapper.find('div').first().childAt(0).html()).toEqual('<h1>You are not assigned to a batch!</h1>');
  });

});


describe('test ajax calls', function () {

  beforeEach(function() { 
    const wrapper = mount(<Curriculum/>);

     sessionStorage.setItem('batchName','0-0-Java');

    });
  
  it('should render syllabus correctly', ()=>{
     
     setTimeout(function(){
       expect(wrapper.find('h3').length).toEqual(1);
       expect(wrapper.find('h3').text()).toEqual('Week 1: Core');

    done(); 
  }, 5000);
    expect(wrapper.find('h1').length).toEqual(1);   

  });

});
export default Tests

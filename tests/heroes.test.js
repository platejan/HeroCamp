import React from 'react';
import { HeroesPage } from '../src/components/heroes/HeroesPage.js';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

describe('<HeoresPage />', function () {
    it('should have an button to add a hero', function (){
        const wrapper = shallow(<HeroesPage />);
        expect(wrapper.find('submit')).should.have.property('value').equal('Add Hero'); 
    });
});


import expect from 'expect';
import firebase from 'firebase';
import * as actions from './HeroesActions';
import * as types from './actionTypes';


firebase.initializeApp({
  apiKey: 'WriteSomethingHere',
  databaseURL: 'ws://127.0.1:5000'
});

describe('Heores', function () {
  describe('firebase exists', function () {
    it('should not be null', function (done) {
      if (expect(firebase) != null) {
        done()
      }
    });

    it('add hero', ()=> {
      const hero = {name: "Charlotte"};
      let getState = ()=> {
        return {auth: {currentUserUID: "0"}}
      };
      let addhero = actions.addHero(hero, ()=> {
      });
      console.log(addhero(()=> {
      }, getState));
      Promise.all(firebase.database().ref("heroes").orderByKey().equalTo("0").once('value',(snapshot)=>{return snapshot.val()})).then((snapshot)=>{
        console.log(snapshot);
      })
    })
  });
});

import expect from 'expect'
import * as actions from './ChaptersActions'
import * as types from './actionTypes'

describe('actions', () => {
  it('should load chapters', () => {
    const chapters = {};
    const expectedAction = {
      type: types.CHAPTERS_LOAD_SUCCESS,
      chapters
    }
    expect(actions.chaptersLoadList(chapters)).toEqual(expectedAction)
  })
})

import React from 'react'
import items from './items.js'
import * as testingLibrary from '@testing-library/react'

describe('ITEMS REDUCER', () => {
  it('should return the initial state', () => {
    expect(items(undefined, {})).toEqual([])
  })

  describe('ADD_ITEM', () => {
    it('should handle ADD_ITEM', () => {
      expect(items([], {
        type: 'ADD_ITEM',
        payload: {
          uuid: '1234',
        }
      })).toEqual([
        {
          uuid: '1234',
        }
      ])
    })
    it('should handle adding topic via ADD_ITEM', () => {
      expect(items([{}], {
        type: 'ADD_ITEM',
        payload: {
          uuid: '1234',
          complete: false,
          completionTime: 0,
          text: '',
          subtopic: []
        }
      })).toEqual([
        {},
        {
          uuid: '1234',
          complete: false,
          completionTime: 0,
          text: '',
          subtopic: []
        }
      ])
    })

    it('should add new subtopics to topic subtopics array via ADD_ITEM', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        completionTime: 0,
        text: '',
        subtopics: []
      }], {
        type: 'ADD_ITEM',
        payload: {
          parentUuid: '1234',
          uuid: 'ABCD',
          complete: false,
          completionTime: 0,
          text: '',
        }
      })).toEqual([
        {
          uuid: '1234',
          complete: false,
          completionTime: 0,
          text: '',
          subtopics: [
            {
              parentUuid: '1234',
              uuid: 'ABCD',
              complete: false,
              completionTime: 0,
              text: '',
            }
          ]
        },
      ])
    })
  })

  describe('UPDATE_ITEM', () => {
    it('should handle UPDATE_ITEM', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        text: '',
        completionTime: 0,
        subtopics: []
      }], {
        type: 'UPDATE_ITEM',
        payload: {
          uuid: '1234',
          updatedItem: {
            complete: true,
            text: 'help me',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          complete: true,
          text: 'help me',
          completionTime: 0,
          subtopics: []
        },
      ])
    })
    it('should handle updating subtopics', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        text: '',
        completionTime: 0,
        subtopics: [
          {
            uuid: 'ABCD',
            complete: false,
            text: '',
          }
        ]
      }], {
        type: 'UPDATE_ITEM',
        payload: {
          parentUuid: '1234',
          uuid: 'ABCD',
          updatedItem: {
            complete: true,
            text: 'help me',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          complete: false,
          text: '',
          completionTime: 0,
          subtopics: [
            {
              uuid: 'ABCD',
              complete: true,
              text: 'help me',
            }
          ]
        }
      ])
    })
    it('should complete all subtopics on topic completion', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        text: '',
        completionTime: 0,
        subtopics: [
          {
            parentUuid: '1234',
            uuid: 'ABCD',
            complete: false,
            text: '',
            completionTime: 0,
          },
          {
            parentUuid: '1234',
            uuid: 'EFGH',
            complete: false,
            text: '',
            completionTime: 0,
          },
          {
            parentUuid: '1234',
            uuid: 'IJKL',
            complete: false,
            text: '',
            completionTime: 0,
          }
        ]
      }], {
        type: 'UPDATE_ITEM',
        payload: {
          uuid: '1234',
          updatedItem: {
            complete: true,
            text: 'help me',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          complete: true,
          text: 'help me',
          completionTime: 0,
          subtopics: [
            {
              parentUuid: '1234',
              uuid: 'ABCD',
              complete: true,
              text: '',
              completionTime: 0,
            },
            {
              parentUuid: '1234',
              uuid: 'EFGH',
              complete: true,
              text: '',
              completionTime: 0,
            },
            {
              parentUuid: '1234',
              uuid: 'IJKL',
              complete: true,
              text: '',
              completionTime: 0,
            }
          ]
        }
      ])
    })
  })

  describe('DELETE_ITEM', () => {
    it('should handle DELETE_ITEM', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        text: '',
        subtopics: [],
      }], {
        type: 'DELETE_ITEM',
        payload: {
          uuid: '1234',
        }
      })).toEqual([])
    })

    it('should delete subtopics', () => {
      expect(items([{
        uuid: '1234',
        complete: false,
        text: '',
        subtopics: [{
          uuid: 'ABCD',
          complete: false,
          text: '',
        }],
      }], {
        type: 'DELETE_ITEM',
        payload: {
          parentUuid: '1234',
          uuid: 'ABCD',
        }
      })).toEqual([
        {
          uuid: '1234',
          complete: false,
          text: '',
          subtopics: [],
        }
      ])
    })
  })
})
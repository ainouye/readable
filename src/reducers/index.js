import { ADD_CATEGORY, ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, EDIT_POST, VOTE_COMMENT, VOTE_POST } from '../actions'
import { combineReducers } from 'redux';

function categories(state=[], action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return [
        ...state,
        {
          name: action.name,
          slug: action.slug
        }
      ]

    default:
      return state
  }
}

function posts (state={}, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.id]: {
          category: action.category,
          timestamp: action.timestamp,
          author: action.author,
          title: action.title,
          body: action.body,
          voteScore: action.voteScore
        }
      }
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
      }
    case DELETE_POST:
      return {
        ...state,
        [action.id]: null
      }
    case VOTE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    default:
      return state
  }
}

function comments(state=[], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.id]: {
          timestamp: action.timestamp,
          author: action.author,
          body: action.body,
          parentId: action.parentId,
          voteScore: action.voteScore
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          body: action.body
        }
      }
    case VOTE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.voteScore
        }
      }
    case DELETE_COMMENT:
    console.log('ok')
      return {
        ...state,
        [action.id]: null
      }
    default:
      return state
  }
}

export default combineReducers({ categories, comments, posts })

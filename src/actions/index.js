import * as ReadableAPI from '../utils/api'

export const ADD_CATEGORY = 'ADD_CATEGORY'

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

export function populateCategory({ name, slug }) {
    return {
        type: ADD_CATEGORY,
        name,
        slug
    }
}

export function populateComment({ id, parentId, author, body, timestamp, voteScore }) {
    return {
        type: ADD_COMMENT,
        parentId,
        id,
        author,
        body,
        timestamp,
        voteScore
    }
}

export function populatePost({ id, category, author, title, body, timestamp, voteScore }) {
    return {
        type: ADD_POST,
        category,
        id,
        author,
        title,
        body,
        timestamp,
        voteScore
    }
}

function addPostToDatabase({ id, category, author, title, body, timestamp }) {
    return ReadableAPI.addPost({
        id,
        timestamp,
        category,
        author,
        title,
        body
    }).catch(e => {})
}

export function addPost(data) {
  return function (dispatch) {
    return addPostToDatabase(data).then(
        (post) => dispatch(populatePost(data))
    )
  }
}

export function editPostStore({ id, title, body }) {
    return {
        type: EDIT_POST,
        id,
        body,
        title
    }
}

function editPostDatabase({ id, title, body }) {
    return ReadableAPI.editPost(id, {
        title,
        body
    }).catch(e => {})
}

export function editPost(data) {
  return function (dispatch) {
    return editPostDatabase(data).then(
        (data) => dispatch(editPostStore(data))
    )
  }
}

export function removeStore({ id, type }) {
    let typeAction = DELETE_POST
    if (type === 'comments') {
        typeAction = DELETE_COMMENT
    }

    return {
        type: typeAction,
        id
    }
}

function deleteDatabase({ id, type }) {
    return ReadableAPI.deleteObject(id, type).catch(e => {})
}

export function removeObject(data) {
  return function (dispatch) {
    return deleteDatabase(data).then(
        (ob) => dispatch(removeStore(data))
    )
  }
}

export function voteStore({ id, voteScore, type }) {
    let typeAction = VOTE_POST
    if (type === 'comments') {
        typeAction = VOTE_COMMENT
    }

    return {
        type: typeAction,
        id,
        voteScore
    }
}

function voteDatabase(id, option, type) {
    return ReadableAPI.votePost(id, option, type).catch(e => { })
}

export function trackVote({ id, voteScore, option, type }) {
  return function (dispatch) {
    return voteDatabase(id, option, type).then(
        (post) => dispatch(voteStore({ id, voteScore, type }))
    )
  }
}

export function editCommentStore({ id, body }) {
    return {
        type: EDIT_COMMENT,
        id,
        body
    }
}

function editCommentDatabase({ id, body }) {
    return ReadableAPI.editComment(id, {
        body
    }).catch(e => {})
}

export function editComment(data) {
  return function (dispatch) {
    return editCommentDatabase(data).then(
        (post) => dispatch(editCommentStore(data))
    )
  }
}

function addCommentDatabase({ id, parentId, author, body, timestamp }) {
    return ReadableAPI.addComment({
        id,
        timestamp,
        parentId,
        author,
        body
    }).catch(e => {})
}

export function addComment(data) {
  return function (dispatch) {
    return addCommentDatabase(data).then(
        (post) => dispatch(populateComment(data))
    )
  }
}

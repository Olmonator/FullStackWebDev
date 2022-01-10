const _ = require("lodash");

const dummy = (blogs) => {
  return 1
}

const likes = (blogs) => {
    console.log("TEST: blogs", blogs)
    if (blogs.length === 0) {
        console.log("TEST: empty bloglist")
        return 0
    }
    if (blogs.length === 1) {
        console.log("TEST: blocklist has only one entry")
        return blogs[0].likes
    }
    return blogs.map(blog => blog.likes).reduce((p, t) => p + t)
}

const favorite = (blogs) => {
    console.log("TEST: blogs", blogs)
    if (blogs.length === 0) {
        console.log("TEST: empty bloglist")
        return {}
    }
    if (blogs.length === 1) {
        console.log("TEST: blocklist has only one entry")
        return blogs[0]
    }
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    console.log("TEST: maxLikes", maxLikes)
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  //console.log("TEST: blogs", blogs)
  if (blogs.length === 0) {
    console.log("TEST: empty bloglist")
    return {}
  }
  if (blogs.length === 1) {
    console.log("TEST: blocklist has only one entry")
    return blogs[0].author
  }
  let result = _.reduce(blogs, (result, blog) => {
    if (!result[blog.author]) {
      result[blog.author] = 1
    } else {
      result[blog.author] += 1
    }
    return result
}, {});
  console.log(result)
  maxBlogs = result.reduce((max, blog) => max > blog ? max : blog)
}

module.exports = {
  dummy, likes, favorite, mostBlogs
}